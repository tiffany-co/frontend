
# Gold Shop UI - Frontend Service

This repository contains the frontend application for the Gold Shop Management system. It's a simple HTML/CSS/JavaScript client designed to interact with the backend API.

## 🤝 Collaboration and Development Workflow

This frontend repository is managed as a **Git submodule** within the main `CaptainDock` repository. This ensures that the frontend and backend versions are always in sync for any given release.

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
    

### Updating the Backend Submodule

If you are working on a feature that requires a newer version of the backend API that has been released to `main`, you can update your local `backend` submodule from the `CaptainDock` root directory:

```
# This command updates all submodules to the latest commit on their tracked branch
git submodule update --remote --merge

```

## 🚀 Release Process

1.  **Complete a Feature:** When a frontend feature is complete and fully tested on the `develop` branch, it is ready for release.
    
2.  **Merge to `main`:** Create a pull request to merge your changes from the `develop` branch into the `main` branch of this `frontend` repository.
    
3.  **Update the Main Project:** After the merge is complete, a project lead will update the `frontend` submodule pointer in the main `CaptainDock` repository to point to the new commit on the `main` branch. This officially incorporates the new frontend version into the next release of the overall application.