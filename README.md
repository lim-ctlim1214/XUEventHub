# XU EventHub - Last Updated: 11/25/2026 

## Implemented Features (1.0.1):
- Changed Created Events Search to open event management rather than event description.

### Bug Fixes
- Changed Created Events Search to open event management rather than event description.

## Testing Results
- Logins go through to homepage. ☑️
- Logins refuse to go to homepage with wrong credentials. ☑️
- Creating Events pushes through to database ☑️
- Updating Events updates the database ☑️
- Category Filtering in Search returns events in the same category ☑️
- Event Banners appear ☑️
- Bookmarking works as intended ☑️
- Creating secondary events links them to their parent primary event ☑️
- Accessing the Admin Page while logged out forces return to admin login page ☑️
- Inserting and Updating the Database while Unauthenticated will return an error ☑️

## List of Identified Issues and Bugs
- No matter what, 404 error if events don't have banners.

## Progress Report:
- 100% Completion. The application is ready for presentation.

## Screenshots:
#### Homepage
<img width="337" height="750" alt="image" src="https://github.com/user-attachments/assets/5b6985e0-06e3-4ebd-861f-5483f3c7aeba" />

#### Event Description
<img width="337" height="750" alt="image" src="https://github.com/user-attachments/assets/315b428f-b59b-432a-b63f-3d3ce5a89019" />

<img width="337" height="750" alt="image" src="https://github.com/user-attachments/assets/9d9fe63c-b165-4cb1-83d0-0ab8d2f578b1" />

#### Bookmarked Events
<img width="337" height="750" alt="image" src="https://github.com/user-attachments/assets/018c86c8-6c25-40fe-87ca-189636eb1de8" />

#### Search Results
<img width="337" height="750" alt="image" src="https://github.com/user-attachments/assets/0b972870-ff72-4f3b-a5d3-430805fae652" />

#### Admin Login
<img width="337" height="750" alt="image" src="https://github.com/user-attachments/assets/4fe0ed0f-0b02-4fbb-81d3-62be715c32c7" />

#### Admin Homepage
<img width="337" height="750" alt="image" src="https://github.com/user-attachments/assets/c79507ef-085a-404e-8065-73393fa18fbb" />

#### Admin Event Creation
<img width="337" height="750" alt="image" src="https://github.com/user-attachments/assets/d373fa5e-8f45-45cf-8d05-3a648d9a17f1" />

<img width="337" height="750" alt="image" src="https://github.com/user-attachments/assets/e5ff9007-50b7-4738-a844-dbeab8efc527" />

#### Admin Event Management
<img width="337" height="750" alt="image" src="https://github.com/user-attachments/assets/ad504adc-384c-40b3-abcb-03609c930b50" />

<img width="337" height="750" alt="image" src="https://github.com/user-attachments/assets/ae7049d8-e5fb-40ce-97ac-9afcf7b2e041" />

## How To Run:
Dependency: 
Install cordova-plugin-dialogs with the command:
cordova plugin add cordova-plugin-dialogs

There are 2 necessary commands needed to run this application:

cordova build android: Builds the Application for Android Devices
cordova run android: Runs the Application for Android Devices.
These commands must be run in the terminal, and Android Studio must be open, with a device in operation before cordova run android is ran. This application does not have test accounts.
