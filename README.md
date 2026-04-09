# URL Shortener API

- **URL Shortening**: Easily convert long, unwieldy URLs into concise, 7-character short codes.
- **Custom Short Code Generation**: Automatically generates unique, alphanumeric short codes for new URLs.
- **URL Redirection**: When a short code is accessed, users are seamlessly redirected to the original long URL.
- **Access Tracking**: Automatically keeps a count of how many times each shortened URL has been accessed.
- **Short Code Updates**: Change an existing short code to a new, randomly generated one if needed.
- **URL Deletion**: Remove short URLs and their associated data when they're no longer required.
- **Robust Error Handling**: Provides clear error messages for validation failures, duplicate entries, and other issues.

## Getting Started

### Environment Variables

You'll need to set up a few environment variables for the project to run correctly. Create a `.env` file in the root of the project based on the `.env.example` file:

```example
APP_ENV=development
PORT=3000
MONGO_URI=mongodb://get your uri from mongodb atlas
JWT_SECRET=thisisasecretkeyforjwtauthentications
FRONTEND_URL=https://yourfrontendurl.com
```

- `APP_ENV`: Set to `development` for detailed error stacks, or `production` for concise error messages.
- `PORT`: The port your server will run on. Default is `3000`.
- `MONGO_URI`: Your MongoDB connection string. Get this from MongoDB Atlas or your local MongoDB setup.
- `JWT_SECRET`: A secret key for any potential JWT authentication (though not fully implemented in this version, it's used in the error handler).
- `FRONTEND_URL`: The URL of your frontend application, if you have one (used for CORS configuration).

## Usage

To get the server up and running, first make sure you have all the dependencies installed.

```bash
npm install
```

Once installed, you can start the server:

```bash
npm start
```

The server will connect to your MongoDB database and then start listening on the port you configured (default: `3000`). You should see messages like `db connected succesfully` and `server running on port 3000` in your console.

Here's how you can interact with the API:

### Create a new short URL

Send a POST request with the `longUrl` you want to shorten.
**Endpoint**: `POST /api/create-url`

```bash
curl -X POST -H "Content-Type: application/json" -d '{"longUrl": "https://www.example.com/very/long/url/that/needs/shortening"}' http://localhost:3000/api/create-url
```

**Example Response**:

```json
{
  "success": true,
  "newUrl": {
    "longUrl": "https://www.example.com/very/long/url/that/needs/shortening",
    "shortCode": "AbCdEfG",
    "accessCount": 0,
    "_id": "65b9a8e0f9c2d1e3a4b5c6d7",
    "createdAt": "2024-01-31T12:00:00.000Z",
    "updatedAt": "2024-01-31T12:00:00.000Z",
    "__v": 0
  }
}
```

### Retrieve and Redirect a URL

Accessing the short code directly will redirect you to the original long URL and increment its access count.
**Endpoint**: `GET /api/get-url/:shortCode`

```bash
# In your browser, navigate to:
# http://localhost:3000/api/get-url/AbCdEfG

# Or using curl, which will follow the redirect:
curl -L http://localhost:3000/api/get-url/AbCdEfG
```

### Update a short code

Change an existing short code to a new, randomly generated one.
**Endpoint**: `PUT /api/update-url-code/:shortCode`

```bash
curl -X PUT http://localhost:3000/api/update-url-code/AbCdEfG
```

**Example Response**:

```json
{
  "success": true,
  "updatedUrl": {
    "longUrl": "https://www.example.com/very/long/url/that/needs/shortening",
    "shortCode": "hIjKlMn",
    "accessCount": 10,
    "_id": "65b9a8e0f9c2d1e3a4b5c6d7",
    "createdAt": "2024-01-31T12:00:00.000Z",
    "updatedAt": "2024-01-31T12:30:00.000Z",
    "__v": 0
  }
}
```

### Delete a URL

Remove a short URL entry from the database.
**Endpoint**: `DELETE /api/delete-url/:shortCode`

```bash
curl -X DELETE http://localhost:3000/api/delete-url/hIjKlMn
```

**Example Response**:

```json
{
  "success": true,
  "message": "deleted url",
  "deletedUrl": {
    "longUrl": "https://www.example.com/very/long/url/that/needs/shortening",
    "shortCode": "hIjKlMn",
    "accessCount": 10,
    "_id": "65b9a8e0f9c2d1e3a4b5c6d7",
    "createdAt": "2024-01-31T12:00:00.000Z",
    "updatedAt": "2024-01-31T12:30:00.000Z",
    "__v": 0
  }
}
```
