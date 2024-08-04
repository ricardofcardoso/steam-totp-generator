**DISCLAIMER: Never share your `steam.json` or `steam-totp-generator.exe` with anyone. Such action can compromise your own Steam account(s).
I provide no support for you when using steam-totp-generator. This project is not affiliated with Steam. Use this program at your own risk, and accept the responsibility to never share your details and prevent unauthorized access to your computer.**

## Setup
- Rename `steam.example.json` to `steam.json` and fill in with your Steam account(s) details (only the **account name** and **shared secret** are needed).
- Run `npm start` to run the script or `npm run build` to build `steam-totp-generator.exe` with the bundled accounts on the project directory. The executable can then be used anywhere without the need of `steam.json`.

## License
- This project is licensed under the [Apache-2.0 License](https://github.com/ricardofcardoso/steam-totp-generator/blob/develop/LICENSE).

## Credits
- [DoctorMcKay](https://github.com/DoctorMcKay) for creating the amazing [node-steam-totp](https://github.com/DoctorMcKay/node-steam-totp) module.
