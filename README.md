# Customer Management CLI

Command-driven approach for managing customer information.

## Usage

1.  Clone the repository:

    ```shell
    git clone https://github.com/ubongedem78/customer_cli
    ```

2.  Navigate to the project directory:

    ```shell
    cd customer_cli
    ```

3.  Install dependencies:

    ```shell
    npm install
    ```

4.  DB Setup:

    Setup the MongoDB connection:

    Ensure you have a MongoDB database set up.
    Edit the `.env` file and provide your MongoDB connection URI in the `MONGO_URI` variable.

5.  Create Symlink:

    ```shell
    npm link
    ```

## Commands

### Add Customer

    $ customer-cli add

### Find a Customer

    $ customer-cli find <name>

### Update Customer

    $ customer-cli update <_id>

### Remove a Customer

    $ customer-cli remove <_id>

## Contributing

Contributions are very welcome!. If you find any issues or have suggestions for improvements, please open an issue or submit a pull request on GitHub.

## License

This project is open source and available under the [MIT License](LICENSE).
