# XU EventHub - Last Updated: 11/11/2026 

## Implemented Features:

Added Logging into Special Admin Account
- Admin Accounts are created via the supabase auth service.
- You can log in with your username and password.
- Doing so creates a token that allows you to create and manage your own events.

Added Categories!
- Category filtering is now possible via search.
- Each event now has their own category.

Added Event Management
- Managing Events is now possible!

Added Event Creation
- Creating Events is now possible!

Added Secondary Events to Bookmarks
- Secondary Events were given full functionality! Bookmarks now have them!

Added Image Compatibility
- Banners for events now show up on their respective cards.
- Admin Event Management and Creation allows for users to submit their own banners.

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
- Deletion does not work. (Unimplemented)
- Despite Banners having Images, they will always show up as no file name in Admin Event Creation and Admin Event Management
- Lacking feedback in different UI elements (unimplemented)
- No matter what, 404 error if events don't have banners.
- No input validation in Event Management and Creation (unimplemented)

## Actions Resolved to Solving Bugs
- To be implemented in Bug Fix Week. 

## Progress Report:
All admin-related features have been added! However, some elements still lack significant polish. Which will be done in Milestone 5. This was due to time constraints yet again. However, since Milestone 5's deadline is in one week and 85% of the application has been finished, we expect this to be finished by then. 

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
There are 2 necessary commands needed to run this application:

cordova build android: Builds the Application for Android Devices
cordova run android: Runs the Application for Android Devices.
These commands must be run in the terminal, and Android Studio must be open, with a device in operation before cordova run android is ran. This application does not have test accounts.
