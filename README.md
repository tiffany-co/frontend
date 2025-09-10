
# Gold Shop UI - Frontend Service

This repository contains the frontend application for the Gold Shop Management system. It's a simple HTML/CSS/JavaScript client designed to interact with the backend API.

## 🚀 Getting Started

### Using the Backend API

To develop the frontend, you will need the backend server running. By default, the backend is available at:

-   **API Base URL:**  `http://localhost:8000`
    
-   **Interactive API Docs (Swagger):**  `http://localhost:8000/docs`
    

You can use the Swagger documentation to explore all available endpoints, see their required parameters, and test them directly from your browser.

## 🤝 Git Workflow & Release Process

This project follows a standard Git flow where `develop` is for active work and `main` is for stable releases only.

### Developer Workflow

1.  **Work on the `develop` Branch:** All new features, bug fixes, and development should be done on the `develop` branch of this `frontend` repository.
    
2.  **Get the Latest API:** The backend API is developed independently. To test your frontend against the latest stable version of the API, you need to update the `CaptainDock` repository.
    
3.  **Update `CaptainDock`:** In your local `CaptainDock` repository, pull the latest changes from the `main` branch. This branch will always have a stable, released version of the backend.
    
    ```
    # From the CaptainDock root directory
    git checkout main
    git pull origin main
    
    ```
    
4.  **Run the Backend:** Follow the instructions in the main `CaptainDock` README to run the project in either development or production mode. This will give you a live API to develop against.

### 1. Day-to-Day Development

-   **Always work on the `develop` branch.** All new features and bug fixes should be done in feature branches that are then merged into `develop`.
    
-   To get the latest changes from other developers, pull from the `develop` branch:
    
    ```
    git checkout develop
    git pull origin develop
    
    ```
    

### 2. Creating a New Release

When the features in the `develop` branch are complete, tested, and ready for a new release, follow these steps to merge them into the `main` branch.

**Step 1: Sync `develop`** Ensure your local `develop` branch has the latest code.

```
git checkout develop
git pull origin develop

```

**Step 2: Merge `develop` into `main`** Switch to the `main` branch, pull its latest version, and then merge `develop` into it.

```
git checkout main
git pull origin main
git merge develop

```

_At this point, resolve any merge conflicts if they occur._

**Step 3: Tag the Release** Create a new version tag on the `main` branch. Use semantic versioning (e.g., `v1.0.0`, `v1.1.0`).

```
# Example for version 1.0.0
git tag -a v1.0.0 -m "Release version 1.0.0"

```

**Step 4: Push the Release to the Remote Repository** Push both the `main` branch and the new tags to the remote repository. The `--tags` flag is crucial.

```
git push origin main --tags

```

**Step 5: Sync `develop` Back from `main`** This is a critical final step to ensure the `develop` branch also receives the version tag and any merge-related commits from the release process.

```
git checkout develop
git merge main
git push origin develop

```

Your `main` branch now contains the new stable release, and your `develop` branch is correctly synced and ready for the next cycle of development.