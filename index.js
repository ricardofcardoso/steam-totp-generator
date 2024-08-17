const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const SteamTotp = require('steam-totp');

const getFilePath = () => {
    return path.join(__dirname, 'steam.json');
};

const generateTOTPForAccount = (account, offset) => {
    const sharedSecret = account.shared_secret;
    const code = SteamTotp.generateAuthCode(sharedSecret, offset);

    console.log(`\nAccount: ${account.accountName}`);
    console.log(`Code: ${code}\n`);
};

const promptUserAction = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'Do you want to generate a code for another account or exit?',
            choices: [
                { name: 'Generate code for another account', value: 'continue' },
                { name: 'Exit', value: 'exit' }
            ]
        }
    ]);
};

const main = () => {
    const filePath = getFilePath();

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading accounts file:", err);
            return;
        }

        let accounts;
        try {
            accounts = JSON.parse(data);
        } catch (parseErr) {
            console.error("Error parsing accounts file:", parseErr);
            return;
        }

        SteamTotp.getTimeOffset((error, offset, elapsedTime) => {
            if (error) {
                console.error("Error getting time offset:", error);
                return;
            }

            const processAccountSelection = () => {
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'selectedAccount',
                        message: 'Select an account to generate a TOTP code:',
                        choices: accounts.map(account => ({
                            name: account.accountName,
                            value: account
                        }))
                    }
                ]).then(answers => {
                    const selectedAccount = answers.selectedAccount;
                    generateTOTPForAccount(selectedAccount, offset);

                    promptUserAction().then(actionAnswer => {
                        if (actionAnswer.action === 'continue') {
                            processAccountSelection();
                        } else {
                            console.log('Exiting...');
                            process.exit();
                        }
                    }).catch(promptErr => {
                        console.error("Error prompting user action:", promptErr);
                    });
                }).catch(promptErr => {
                    console.error("Error prompting user:", promptErr);
                });
            };

            processAccountSelection();
        });
    });
};

main();
