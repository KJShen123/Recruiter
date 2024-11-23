
const updateContractBalance = async () => {
    try {
        // Ensure MetaMask is connected and the contract is available
        if (typeof window.ethereum !== "undefined" && window.SubscripRequestContract) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            
            // Connect to the SubscripRequestContract
            const contract = new ethers.Contract(
                window.SubscripRequestContract.address,
                window.SubscripRequestContract.interface.fragments,
                signer
            );

            // Listen to the contractBalance event
            contract.on("contractBalance", (balance) => {
                // Convert balance from Wei to ETH and update the DOM
                const ethBalance = ethers.utils.formatEther(balance);
                document.querySelector(".card-body").innerHTML = `${ethBalance} ETH in Contract`;
            });

            // Optionally, fetch and set the initial balance
            const initialBalance = await provider.getBalance(contract.address);
            const ethBalance = ethers.utils.formatEther(initialBalance);
            document.querySelector(".card-body").innerHTML = `${ethBalance} ETH in Contract`;
        } else {
            console.error("MetaMask or contract is not available.");
        }
    } catch (error) {
        console.error("Error updating contract balance:", error);
    }
};


// Function to load transactions and populate the table
const loadTransactions = async () => {
    try {
        const tbody = document.querySelector("#datatablesSimple tbody");
        tbody.innerHTML = ""; // Clear any existing rows

        // Get the total number of `SubscriptionPurchased` events
        const subscriptionPurchasedFilter = window.SubscripRequestContract.filters.SubscriptionPurchased();
        const events = await window.SubscripRequestContract.queryFilter(subscriptionPurchasedFilter);

        // Sort the events in descending order based on the block number or timestamp
        events.sort((a, b) => b.blockNumber - a.blockNumber);  // Sort by block number (descending)
        // Alternatively, if you want to sort by timestamp, you can use the `timestamp` from `provider.getBlock()`

        // Iterate over each event to fetch recruiter details
        for (const event of events) {
            const { recruiter, subscriptionType } = event.args;

            // Fetch recruiter details using the viewRecruiter function
            const recruiterDetails = await window.SubscripRequestContract.viewRecruiter(recruiter);

            recruiterDetails.forEach((recruiterData) => {
                const subscriptionPlan = mapSubscriptionType(subscriptionType);
                const paymentValue = calculatePaymentValue(subscriptionType);

                // Create a new row
                const row = document.createElement("tr");
                row.innerHTML = `  
                    <td>${recruiterData.publicKey}</td>
                    <td>${recruiterData.userName}</td>
                    <td>${recruiterData.email}</td>
                    <td>${recruiterData.companyName}</td>
                    <td>${subscriptionPlan}</td>
                    <td>${paymentValue} ETH</td>
                `;
                tbody.appendChild(row);
            });
        }
    } catch (error) {
        console.error("Error loading transactions:", error);
        alert("Failed to load transactions. Please try again.");
    }
};


// Helper function to map subscription types
const mapSubscriptionType = (subscriptionType) => {
    switch (subscriptionType) {
        case 1:
            return "Month Plan";
        case 2:
            return "Half-Year Plan";
        case 3:
            return "Year Plan";
        default:
            return "None";
    }
};

// Helper function to calculate payment values
const calculatePaymentValue = (subscriptionType) => {
    switch (subscriptionType) {
        case 1: // Month Plan
            return "0.01";
        case 2: // Half-Year Plan
            return "0.05";
        case 3: // Year Plan
            return "0.1";
        default: // None
            return "0.00";
    }
}


// Function to withdraw ETH
const withdrawValue = async () => {
    try {
        // Get the withdrawal value from the input field
        const valueInput = document.getElementById("value").value.trim();

        // Validate input
        if (!valueInput || isNaN(valueInput) || Number(valueInput) <= 0) {
            alert("Please enter a valid withdrawal amount greater than 0.");
            return;
        }

        const withdrawalAmount = ethers.utils.parseEther(valueInput); // Convert to Wei for the contract

        // Ensure MetaMask is connected and the contract is available
        if (typeof window.ethereum === "undefined" || !window.SubscripRequestContract) {
            alert("MetaMask or contract is not properly initialized. Please connect MetaMask.");
            return;
        }

        // Get the signer from MetaMask
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        // Connect to the SubscripRequestContract with the signer
        const contract = new ethers.Contract(
            window.SubscripRequestContract.address,
            window.SubscripRequestContract.interface.fragments,
            signer
        );

        // Check contract balance before proceeding
        const contractBalance = await provider.getBalance(window.SubscripRequestContract.address);
        if (withdrawalAmount.gt(contractBalance)) {
            alert("Insufficient contract balance to withdraw this amount.");
            return;
        }

        // Send the transaction to withdraw ETH
        const tx = await contract.withdrawETH(withdrawalAmount);

        // Wait for the transaction to be mined
        await tx.wait();
        alert("Withdrawal successful!");

        // Update the contract balance after withdrawal
        await updateContractBalance();

        // Clear the input field after successful withdrawal
        document.getElementById("value").value = "";

    } catch (error) {
        console.error("Error during withdrawal:", error);

        // Check for contract ownership error
        if (error.message && error.message.includes("revert Not contract owner")) {
            alert("This MetaMask account is not the contract owner.");
        }
        // Check for error message in the data field (common in ethers.js contract calls)
        else if (error.data && error.data.message) {
            alert(`Withdrawal failed: ${error.data.message}`);
        } 
        // Handle specific cases where the error message is directly accessible from the error object
        else if (error.error && error.error.message) {
            alert(`Withdrawal failed: ${error.error.message}`);
        }
        // Fallback for other error types
        else if (error.message) {
            alert(`Withdrawal failed: ${error.message}`);
        } 
        else {
            alert("An unknown error occurred during withdrawal.");
        }
    }
};


