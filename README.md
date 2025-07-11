A Node.js application with Express.js and MongoDB for user authentication, file upload (image/video with thumbnail), and advanced search. Includes Swagger and Postman documentation.

## Features
- User signup/login with JWT authentication
- Upload images (jpeg/png) and videos (mp4, max 10s, 100MB)
- Automatic 100x100 thumbnail generation for all files
- Metadata: title, description, alignment, resolution
- Search with filters, pagination, sorting, and full-text
- API docs via Swagger (`/api-docs`)

## Setup
1. Clone the repo
2. Run `npm install`
3. Create a `.env` file (see `.env.example`):
   - `PORT=5000`
   - `MONGO_URI=mongodb://localhost:27017/search_functionality`
   - `JWT_SECRET=your_jwt_secret_here`
4. Start MongoDB
5. Run `npm start` or `nodemon src/app.js`

## Usage
- Signup: `POST /auth/signup`
- Login: `POST /auth/login`
- Upload: `POST /upload` (JWT required)
- Search: `GET /search`
- Docs: [http://localhost:5000/api-docs](http://localhost:5000/api-docs)

## Postman
- Import Swagger JSON from `/api-docs/swagger.json` into Postman for ready-to-use requests.

## License
MIT

<!--
To run the app, use:
  node src/app.js
or
  nodemon src/app.js
from the project root directory.
-->
## env
PORT=5000
MONGO_URI=mongodb://localhost:27017/search_functionality
JWT_SECRET=your_jwt_secret_here

## Why ffmpeg/ffprobe?
To generate video thumbnails and check video duration, this project uses [ffmpeg](https://ffmpeg.org/) and its tool ffprobe. ffmpeg is a fast, reliable, and industry-standard tool for processing media files. It ensures:
- Accurate thumbnail extraction from any video
- Fast and efficient duration checks
- Support for all common video formats

> Alternative: You could use cloud services (like Cloudinary, AWS Lambda, etc.) for video processing, but for local development and most backend use-cases, ffmpeg is the cleanest and most performant solution.

### How to install ffmpeg/ffprobe

#### Windows
1. Download the latest build from: https://www.gyan.dev/ffmpeg/builds/
2.  downloads in release builds section file named 'ffmpeg-release-essentials.zip' Extract the zip 
3. Add `{{path of ffmpeg that downloaded\bin` to your system PATH:
   - Control Panel → System → Advanced → Environment Variables
   - Edit the `Path` variable and add the full path to the `bin` folder
   - Open a new terminal and run `ffmpeg -version` and `ffprobe -version` to check

#### macOS
1. Install [Homebrew](https://brew.sh/) if you don't have it
2. Run:
   ```sh
   brew install ffmpeg
   ```
3. Test with `ffmpeg -version` and `ffprobe -version`

#### Linux (Debian/Ubuntu)
1. Run:
   ```sh
   sudo apt update
   sudo apt install ffmpeg
   ```
2. Test with `ffmpeg -version` and `ffprobe -version`

---
If you use a cloud service for uploads, you can offload thumbnail and duration extraction to the cloud, but for most Node.js backends, local ffmpeg is the best practice.
