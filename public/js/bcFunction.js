// Function to check if the user is registered
const checkUserRegistration = async () => {
    try {
        if (!window.ethereum) {
            alert("MetaMask is not installed. Please install it to use this site.");
            return;
        }

        const accounts = await ethereum.request({ method: "eth_requestAccounts" });
        const currentAddress = accounts[0];

        // Get the SubscriptionPurchased events for the current user
        const events = await window.SubscripRequestContract.queryFilter(
            window.SubscripRequestContract.filters.SubscriptionPurchased(currentAddress, null, null)
        );

        // If no records found, redirect to subscription page
        if (events.length === 0) {
            sessionStorage.setItem("registered", "false");
            window.location.href = "Subscription.html";
            return;
        }

        // Find the newest event for the current user
        const newestEvent = events.reduce((latest, event) => {
            return event.args.expiryDate > (latest?.args.expiryDate || 0) ? event : latest;
        }, null);

        // Check expiry date
        const expiryDate = newestEvent.args.expiryDate.toNumber(); // Convert BigNumber to a number
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

        if (expiryDate < currentTime) {
            sessionStorage.setItem("registered", "false");
            window.location.href = "Subscription.html";
        } else {
            sessionStorage.setItem("registered", "true");
            window.location.href = "Search.html";
        }
    } catch (error) {
        console.error("Error checking user registration:", error);
        alert("An error occurred while checking your registration. Please try again.");
    }
};


const checkSubscriptionAndDisplay = async () => {
    const currentPlanElement = document.getElementById("Current");

    const displayNoPlanMessage = () => {
        currentPlanElement.innerHTML = `
            <h3>You have not purchased any plan yet or your purchased plan has expired.</h3>
        `;
    };

    const displayPlanDetails = (planType, expiryDate, remainingDays) => {
        currentPlanElement.innerHTML = `
            <h3>Plan Type: ${planType}</h3>
            <p>Expiry Date: ${expiryDate}</p>
            <p>Remaining Days: ${remainingDays} Days</p>
        `;
    };

    try {
        const registered = sessionStorage.getItem("registered");

        if (registered === "false") {
            displayNoPlanMessage();
        } else {
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            const currentAddress = accounts[0];

            const events = await window.SubscripRequestContract.queryFilter(
                window.SubscripRequestContract.filters.SubscriptionPurchased(currentAddress, null, null)
            );

            if (events.length === 0) {
                displayNoPlanMessage();
                return;
            }

            // Find the newest event for the user
            const newestEvent = events.reduce((latest, event) => {
                return event.args.expiryDate > (latest?.args.expiryDate || 0) ? event : latest;
            }, null);

            const expiryDate = newestEvent.args.expiryDate.toNumber();
            const currentTime = Math.floor(Date.now() / 1000);
            const remainingDays = Math.ceil((expiryDate - currentTime) / (60 * 60 * 24));
            const subscriptionType = newestEvent.args.subscriptionType;

            // Map subscriptionType to human-readable plan type
            const planTypeMap = {
                1: "Month Plan",
                2: "Session Plan",
                3: "Year Plan",
            };
            const planType = planTypeMap[subscriptionType] || "Unknown Plan";

            if (expiryDate < currentTime) {
                displayNoPlanMessage();
            } else {
                displayPlanDetails(planType, new Date(expiryDate * 1000).toLocaleDateString(), remainingDays);
            }
        }
    } catch (error) {
        console.error("Error fetching subscription details:", error);
        alert("An error occurred. Please try again.");
    }
};


const purchaseSubscription = async (subscriptionType) => {
    try {
        if (!window.ethereum) {
            alert("Please install MetaMask to proceed.");
            return;
        }

        // Retrieve session data
        const email = sessionStorage.getItem("email");
        const userName = sessionStorage.getItem("userName");
        const companyName = sessionStorage.getItem("companyName");

        if (!email || !userName || !companyName) {
            alert("User session data is missing. Please log in again.");
            return;
        }

        // Mapping subscription type to enum and cost
        const subscriptionEnum = {
            Month: 1,
            HalfYear: 2,
            Year: 3,
        };

        const subscriptionCost = {
            Month: 0.01,
            HalfYear: 0.05,
            Year: 0.1,
        };

        if (!subscriptionEnum[subscriptionType]) {
            alert("Invalid subscription type.");
            return;
        }

        const cost = subscriptionCost[subscriptionType];

        // Connect to MetaMask
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });
        const userAddress = accounts[0];

        // Connect the contract with a signer
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contractWithSigner = window.SubscripRequestContract.connect(signer);

        // Call the smart contract function with session data
        const txn = await contractWithSigner.registerAndPurchaseSubscription(
            subscriptionEnum[subscriptionType], // Enum value for subscription type
            email,
            userName,
            companyName,
            { value: ethers.utils.parseEther(cost.toString()) } // Send the payment in ETH
        );

        // Wait for the transaction to be mined
        await txn.wait();

        alert(`Subscription purchased successfully: ${subscriptionType}`);
        sessionStorage.setItem("registered", "true");
        window.location.href = 'viewPlan.html';
    } catch (error) {
        console.error("Error purchasing subscription:", error);
        alert("Your payment processing has been cancelled.");
    }
};


// Function to search for a user by public key
const searchUserByPublicKey = async () => {
    const searchInput = document.getElementById("searchInput").value.trim().toLowerCase();

    if (!searchInput) {
        alert("Please enter a public key.");
        return;
    }

    console.log("Searching for address:", searchInput);

    try {
        // Query events from the CVUploaderContract with empty filter for non-indexed params
        const events = await window.CVUploaderContract.queryFilter(
            window.CVUploaderContract.filters.CVUploaded(searchInput)
        );

        console.log("Events found:", events);

        // Check if the entered public key has any events
        if (events.length > 0) {
            // Save the public key in sessionStorage
            sessionStorage.setItem("publicKey", searchInput);

            // Redirect to the segment.html page
            window.location.href = "segment.html";
        } else {
            alert("User may haven't registered or uploaded CV yet.");
        }
    } catch (error) {
        console.error("Error searching for user:", error);
        alert("An error occurred while searching for the user. Please try again.");
    }
};


const searchUserByQRCode = async (searchInput) => {
    // Trim and convert address to lowercase
    searchInput = searchInput.trim().toLowerCase();

    if (!searchInput) {
        alert("Please enter a public key.");
        return;
    }

    console.log("Searching for address:", searchInput);

    try {
        // Query events from the CVUploaderContract with empty filter for non-indexed params
        const events = await window.CVUploaderContract.queryFilter(
            window.CVUploaderContract.filters.CVUploaded(searchInput)
        );

        console.log("Events found:", events);

        // Check if the entered public key has any events
        if (events.length > 0) {
            // Save the public key in sessionStorage
            sessionStorage.setItem("publicKey", searchInput);

            // Redirect to the segment.html page
            window.location.href = "segment.html";
        } else {
            alert("User may not have registered or uploaded CV yet.");
        }
    } catch (error) {
        console.error("Error searching for user:", error);
        alert("An error occurred while searching for the user. Please try again.");
    }
};


// Function to fetch and display wallet holder's information
async function getWalletHolderInfo() {
    // Retrieve the public key from session storage
    const publicKey = sessionStorage.getItem("publicKey");

    if (!publicKey) {
        alert("Public key not found in session.");
        return;
    }

    try {
        // Call the `viewWalletHolders` function from the contract
        const walletHolderInfo = await window.CVUploaderContract.viewWalletHolders(publicKey);

        // Ensure we have the data in the response
        if (walletHolderInfo && walletHolderInfo.length > 0) {
            const walletHolder = walletHolderInfo[0]; 

            // Populate the HTML with the wallet holder's information
            document.getElementById("userName").innerText = `Name: ${walletHolder.name}`;
            document.getElementById("userEmail").innerText = `Email: ${walletHolder.email}`;
        } else {
            alert("No wallet holder information found for this address.");
        }
    } catch (error) {
        console.error("Error fetching wallet holder info:", error);
        alert("An error occurred while fetching wallet holder information. Please try again.");
    }
}


// Function to submit the request based on the selected segment type
async function submitRequest() {
    // Check if the user is registered using the "registered" session key
    const isRegistered = sessionStorage.getItem("registered");

    if (!isRegistered || isRegistered === "false") {
        alert("Please purchase a plan to continue.");
        window.location.href = "viewPlan.html";
        return;
    }

    // Retrieve the public key from session storage
    const publicKey = sessionStorage.getItem("publicKey");

    if (!publicKey) {
        alert("Public key not found in session.");
        return;
    }

    // Get the selected segment type from the radio buttons
    const segmentType = document.querySelector('input[name="info"]:checked')?.value;

    if (!segmentType) {
        alert("Please select a segment type.");
        return;
    }

    // Map the segment type string to the enum values used in the smart contract
    let segmentTypeEnum;
    switch (segmentType) {
        case "All":
            segmentTypeEnum = 0; // All segment (enum value)
            break;
        case "WorkSoftSkill":
            segmentTypeEnum = 1; // Work Experience & Soft Skill (enum value)
            break;
        case "EducationCertification":
            segmentTypeEnum = 2; // Education & Certificates (enum value)
            break;
        default:
            alert("Invalid segment type selected.");
            return;
    }

    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contractWithSigner = window.SubscripRequestContract.connect(signer);

        // Send the createViewRequest transaction to the contract
        const tx = await contractWithSigner.createViewRequest(publicKey, segmentTypeEnum);

        // Wait for the transaction to be mined
        await tx.wait();

        alert("Request submitted successfully!");

        // Redirect to search page
        window.location.href = "search.html";
    } catch (error) {
        console.error("Error submitting request:", error);
        alert("An error occurred while submitting the request. Please try again.");
    }
}



// Enum for RequestStatus
const RequestStatus = {
    0: "Pending",
    1: "Accepted",
    2: "Rejected"
};

// Fetch the request history made by the current logged-in user (recruiter)
async function fetchRequestHistory() {
    try {
        // Get the current signer (recruiter)
        const signer = await provider.getSigner();
        const recruiterAddress = await signer.getAddress();

        // Fetch all events related to the 'ViewRequest' event for the current recruiter
        const events = await window.SubscripRequestContract.queryFilter(
            window.SubscripRequestContract.filters.ViewRequest(null, recruiterAddress)
        );

        // Create an object to track the most recent event for each requestIndex
        const requestsMap = {};

        // Loop through the events and ensure we store only the most recent event for each requestIndex
        events.forEach(event => {
            const { walletHolder, segmentType, status, requestIndex } = event.args;
            const blockNumber = event.blockNumber;

            console.log(`Processing Event: requestIndex = ${requestIndex}, blockNumber = ${blockNumber}`);

            // If the requestIndex is not in the map or the new event has a higher blockNumber, update the entry
            if (!requestsMap[requestIndex] || blockNumber > requestsMap[requestIndex].timestamp) {
                console.log(`Storing/Updating event for requestIndex: ${requestIndex}`);
                requestsMap[requestIndex] = {
                    walletHolder,
                    segmentType,
                    status,
                    requestIndex,
                    timestamp: blockNumber, // Use blockNumber as the timestamp
                    name: "",  // Placeholder, will fetch later
                    email: ""  // Placeholder, will fetch later
                };
            }
        });

        // Convert the object values to an array and sort it by timestamp (blockNumber) in descending order
        const sortedRequests = Object.values(requestsMap).sort((a, b) => b.timestamp - a.timestamp);

        // Debugging the sorted array
        console.log("Sorted Requests:", sortedRequests);

        // Now populate the UI with the request data
        const planListElement = document.getElementById("planList");

        // Clear previous content
        planListElement.innerHTML = "<h3>Request History</h3>";

        // Fetch name and email for each walletHolder and display the requests
        for (let request of sortedRequests) {
            // Fetch wallet holder information (name and email)
            const walletHolderInfo = await getWalletHolder(request.walletHolder);

            // Update the request object with the wallet holder's name and email
            request.name = walletHolderInfo.name;
            request.email = walletHolderInfo.email;

            // Create a plan card for this request
            const planCard = document.createElement("div");
            planCard.classList.add("plan-card");

            // Only set the onclick event if the status is "Accepted"
            if (request.status === 1) { // 1 corresponds to "Accepted" in the RequestStatus enum
                planCard.setAttribute("onclick", `setSessionAndRedirect("${request.walletHolder}", ${request.segmentType})`);
            }

            planCard.innerHTML = `
                <div class="plan-info">
                    <h4>Wallet Holder</h4>
                    <p>Address: ${request.walletHolder}</p>
                    <p>Name: ${request.name}</p>
                    <p>Email: ${request.email}</p>
                    <p>Segment: ${segmentTypeToString(request.segmentType)}</p>
                    <p class="status">${RequestStatus[request.status]}</p>
                </div>
            `;

            // Append the plan card to the plan list
            planListElement.appendChild(planCard);
        }
    } catch (error) {
        console.error("Error fetching request history:", error);
        alert("An error occurred while fetching your request history. Please try again.");
    }
}


function segmentTypeToString(segmentType) {
    switch (segmentType) {
        case 0:
            return "All Segment";
        case 1:
            return "Work Experience & Soft Skill";
        case 2:
            return "Education & Certificates";
        default:
            return "Unknown Segment";
    }
}

async function getWalletHolder(walletHolderAddress) {
    const walletHolderData = await window.CVUploaderContract.viewWalletHolders(walletHolderAddress);

    // Assuming the data is returned in the correct format (an array)
    return {
        name: walletHolderData[0].name,
        email: walletHolderData[0].email
    };
}

function setSessionAndRedirect(walletHolderAddress, segmentType) {
    // Store the wallet holder's address and segmentType in sessionStorage
    sessionStorage.setItem("selectedWalletHolderAddress", walletHolderAddress);
    sessionStorage.setItem("selectedSegmentType", segmentType);

    // Redirect to detail.html
    window.location.href = 'detail.html';
}


async function displayRequestedInformation() {
    try {
        // Get the selected wallet holder address and segment type from sessionStorage
        const walletHolderAddress = sessionStorage.getItem("selectedWalletHolderAddress");
        const segmentType = parseInt(sessionStorage.getItem("selectedSegmentType"));

        // Fetch all credentials using the viewAllCredentials function
        const [walletHolder, softSkills, works, educations, certifications] =
            await window.CVUploaderContract.viewAllCredentials(walletHolderAddress);

        // Reference to the info list container
        const infoListElement = document.getElementById("infoList");

        // Clear previous content
        infoListElement.innerHTML = "";

        // Create a card for displaying information
        const infoCard = document.createElement("div");
        infoCard.classList.add("info-card");

        const infoInfo = document.createElement("div");
        infoInfo.classList.add("info-info");

        // Display Wallet Holder details
        infoInfo.innerHTML += `
            <h3 style="color: #007bff;">Wallet Holder</h3>
            <p>Name: ${walletHolder[0].name}</p>
            <p>Email: ${walletHolder[0].email}</p>
        `;

        // Conditionally add segments based on the selected segment type
        if (segmentType === 0 || segmentType === 1) { // All or Work Experience & Soft Skills
            
            if (works.length > 0) {
                // Sort works by startDate (descending)
                const sortedWorks = [...works].sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

                infoInfo.innerHTML += `
                    <h4>Work Experience (${sortedWorks.length})</h4>
                    ${sortedWorks.map((work, index) => `
                        <p><strong>Work Experience ${index + 1}:</strong></p>
                        <p><strong>Title:</strong> ${work.title}</p>
                        <p><strong>Company:</strong> ${work.company}</p>
                        <p><strong>Industry:</strong> ${work.industry}</p>
                        <p><strong>Location:</strong> ${work.city}, ${work.state}, ${work.country}</p>
                        <p><strong>Description:</strong> ${work.description}</p>
                        <p><strong>Duration:</strong> ${work.startDate} to ${work.endDate}</p>
                        <hr>
                    `).join("")}
                `;
            }
            
            if (softSkills.length > 0) {
                infoInfo.innerHTML += `
                    <h4>Soft Skills (${softSkills.length})</h4>
                    ${softSkills.map((skill, index) => `
                        <p><strong>Soft Skill ${index + 1}:</strong></p>
                        <p><strong>Highlight:</strong> ${skill.highlight}</p>
                        <p><strong>Description:</strong> ${skill.description}</p>
                        <p><strong>Level:</strong> ${getLevelText(skill.level)}</p>
                        <hr>
                    `).join("")}
                `;
            }
        }

        if (segmentType === 0 || segmentType === 2) { // All or Education & Certificates
            
            if (certifications.length > 0) {
                infoInfo.innerHTML += `
                    <h4>Certifications (${certifications.length})</h4>
                    ${certifications.map((cert, index) => `
                        <p><strong>Certification ${index + 1}:</strong></p>
                        <p><strong>Name:</strong> ${cert.name}</p>
                        <p><strong>Issuer:</strong> ${cert.issuer}</p>
                        <p><strong>Type:</strong> ${cert.certType}</p>
                        <p><strong>Description:</strong> ${cert.description}</p>
                        <p><strong>Acquired Date:</strong> ${cert.acquiredDate}</p>
                        <p><strong>Active:</strong> ${cert.active ? "Yes" : "No"}</p>
                        <hr>
                    `).join("")}
                `;
            }
            
            if (educations.length > 0) {
                // Sort educations by startDate (descending)
                const sortedEducations = [...educations].sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

                infoInfo.innerHTML += `
                    <h4>Education (${sortedEducations.length})</h4>
                    ${sortedEducations.map((edu, index) => `
                        <p><strong>Education ${index + 1}:</strong></p>
                        <p><strong>Level:</strong> ${edu.level}</p>
                        <p><strong>Field of Study:</strong> ${edu.fieldOfStudy}</p>
                        <p><strong>Institute:</strong> ${edu.instituteName}, ${edu.instituteCity}, ${edu.instituteState}, ${edu.instituteCountry}</p>
                        <p><strong>Duration:</strong> ${edu.startDate} to ${edu.endDate}</p>
                        <hr>
                    `).join("")}
                `;
            }
        }

        // Append the card to the container
        infoCard.appendChild(infoInfo);
        infoListElement.appendChild(infoCard);

    } catch (error) {
        console.error("Error fetching and displaying credentials:", error);
        alert("An error occurred while fetching the requested information. Please try again.");
    }
}


// Function to convert level to text
function getLevelText(level) {

    switch (level) {
        case 1: return 'Beginner';
        case 2: return 'Intermediate';
        case 3: return 'Advanced';
        case 4: return 'Expert';
        case 5: return 'Master';
        default: return 'Unknown';
    }
}
