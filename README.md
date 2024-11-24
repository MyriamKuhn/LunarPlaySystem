
# LunarPlay System

LunarPlay System is a website of interactive mini-games inspired by an imaginary solar system. Each game offers a unique experience in stellar environments, where users can explore, play and challenge their skills in a variety of planet- and space-related challenges. No account or login is required; everything works simply by entering a nickname at the start of each game.

- **Interactive games:** Explore various mini-games based on astronomy and science fiction themes.
- **Space theme:** A visual universe inspired by the solar system, with immersive graphics and animations created with Three.js.
- **Ranking system:** Players can see their performance in a central leaderboard, updated after each game.
- **No account required:** Simply enter a nickname to play, no login required.
- **Responsive interface:** Optimized for desktop and mobile screens, making it easy to play on all devices.
## Requirements
Before you start, make sure you have the following components installed on your machine:
- [PHP 8.3](https://www.php.net/docs.php)
- [Composer](https://getcomposer.org/)
- A web server (Apache, Nginx, etc.)
- A NoSQL [MongoDB database](https://www.mongodb.com) to store the application data
## Database Setup

### Create a NoSQL MongoDB database
You will need to create a NoSQL MongoDB database named `savegames` for the project.

### Configure your database credentials
Add your database information to the `.env` file (located in the root directory of the project). Ensure the following variables are set:

- `MONGODB_URI` = the URI to connect to your database
- `MONGODB_DATABASE` = `savegames`
- `MONGODB_COLLECTION_AETHERIA` = `aetheria`
- `MONGODB_COLLECTION_AQUALIS` = `aqualis`
- `MONGODB_COLLECTION_CRYOS` = `cryos`
- `MONGODB_COLLECTION_ELYTHIUM` = `elythium`
- `MONGODB_COLLECTION_GOLIATHOR` = `goliathor`
- `MONGODB_COLLECTION_IGNISFERA` = `ignisfera`
- `MONGODB_COLLECTION_LUNARA` = `lunara`
- `MONGODB_COLLECTION_LUNARPLAY` = `lunarplay`
- `MONGODB_COLLECTION_NEREIDIA` = `nereidia`
- `MONGODB_COLLECTION_RHODARIA` = `rhodaria`
- `MONGODB_COLLECTION_RINGUARA` = `ringuara`

### Initialize the database
Once the database is created, you will need to create the following collections:
- `aetheria`
- `aqualis`
- `cryos`
- `elythium`
- `goliathor`
- `ignisfera`
- `lunara`
- `lunarplay`
- `nereidia`
- `rhodaria`
- `ringuara`
## Environment Variables

To run this project, you will need to add the following environment variables:

- `MONGODB_URI` = the URI to connect to your database
- `MONGODB_DATABASE` = `savegames`
- `MONGODB_COLLECTION_AETHERIA` = `aetheria`
- `MONGODB_COLLECTION_AQUALIS` = `aqualis`
- `MONGODB_COLLECTION_CRYOS` = `cryos`
- `MONGODB_COLLECTION_ELYTHIUM` = `elythium`
- `MONGODB_COLLECTION_GOLIATHOR` = `goliathor`
- `MONGODB_COLLECTION_IGNISFERA` = `ignisfera`
- `MONGODB_COLLECTION_LUNARA` = `lunara`
- `MONGODB_COLLECTION_LUNARPLAY` = `lunarplay`
- `MONGODB_COLLECTION_NEREIDIA` = `nereidia`
- `MONGODB_COLLECTION_RHODARIA` = `rhodaria`
- `MONGODB_COLLECTION_RINGUARA` = `ringuara`
## To run Locally

Clone the project

```bash
  git clone https://github.com/MyriamKuhn/LunarPlaySystem.git
```

Go to the project directory

```bash
  cd LunarPlaySystem
```

If composer.json is already configured with the required dependencies, run:
```bash
  composer install
```

Otherwise, initialize Composer and add each dependency manually:
```bash
  composer init
  composer require mongodb/mongodb
  composer require vlucas/phpdotenv
```
Set your web server to point to the public directory of the project.
Start your web server and navigate to your local instance of the application.

## Troubleshooting

### Environment Variables Not Loading
- **Problem**: Environment variables in `.env` or `.env.test` aren’t being recognized.
- **Solution**: 
  - Make sure the `.env` files are in the correct directories (`App` for `.env` and the root for `.env.test`).
  - Check that the `.env` files are properly formatted (e.g., no extra spaces around `=`).
  - Ensure that the `vlucas/phpdotenv` package is properly installed by running `composer install`.

### Database Connection Issues
- **Problem**: Unable to connect to the database; getting connection errors.
- **Solution**: 
  - Verify that the `MONGODB_URI` is correctly set in your `.env` file.
  - Ensure your database server is running and accessible.
  - Double-check that the database user has appropriate permissions.

### Composer Dependency Issues
- **Problem**: Errors when running Composer commands or dependencies not found.
- **Solution**: 
  - Run `composer install` to ensure all dependencies are installed.
  - If issues persist, clear Composer's cache by running `composer clear-cache`, then re-run `composer install`.

### Web Server Configuration Issues
- **Problem**: The web server is not pointing to the correct directory or unable to start the application.
- **Solution**: 
  - Ensure that your web server (e.g., Apache, Nginx) is configured to serve the project from the `public` directory.
  - In Apache, you may need to adjust your `DocumentRoot` to point to the `public` folder.

### MongoDB Connection Issues
- **Problem**: MongoDB is not accessible or throwing connection errors.
- **Solution**: 
  - Verify the MongoDB server is running and accessible. 
  - Check if the `MONGODB_URI` in your `.env` file is correct, including the correct IP address and port for your MongoDB server.

### File Permissions Issues
- **Problem**: Errors related to file write permissions, particularly for log files or temporary files.
- **Solution**: 
  - Ensure that the web server user has appropriate permissions to read/write to the project directory.
  - You can adjust permissions using the `chmod` or `chown` commands in Linux to grant the necessary access.

### PHP Version Issues
- **Problem**: The PHP version installed is not compatible (must be PHP 8.3).
- **Solution**: 
  - Run `php -v` to check your PHP version. If it’s not 8.3, you may need to update your PHP installation.
  - On Ubuntu, you can install PHP 8.3 using `sudo apt install php8.3`.
## Dependencies

- [PHP 8.3](https://www.php.net/docs.php) - The backend language for building the application.
- [Dotenv 5.6](https://github.com/vlucas/phpdotenv) - A library for managing environment variables, which allows the configuration of sensitive data (like database credentials) to be stored securely in a `.env` file.
- [DataTables](https://datatables.net/) - A jQuery plugin for interactive tables, providing features like pagination, searching, and sorting.
- [MongoDB PHP Driver](https://www.php.net/manual/en/mongodb.installation.php) - The PHP driver to connect and interact with a MongoDB NoSQL database.
- [Phaser 3](https://phaser.io/) - A fast, robust, and versatile HTML5 game framework used to build the interactive games on the platform.
- [Three.js](https://threejs.org/) - A JavaScript library that allows the creation of 3D graphics within the web browser using WebGL, used for rendering the immersive 3D environments of the game.
## Deployed Application
You can access the deployed version of the LunarPlay System application by visiting the following link:

[LunarPlay System Application](https://lunarplay-system.mkcodecreations.dev/)

This is the live web application where users can play and have fun.

## Feedback

I value your feedback! If you have any suggestions, questions, or issues regarding the LunarPlay System project, please feel free to reach out:

myriam.kuehn@free.fr

Your input helps improve the project and ensure a better user experience.
## License

This project is licensed by MIT.

