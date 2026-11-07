# XU EventHub - Last Updated: 11/7/2026 

## Implemented Features:

Added Database Functionality via Supabase.
- Database functionality was added via CDN. It accesses the main database online.

Added Happening Now, Bookmarking and Upcoming Events Display via Homepage.
- The Homepage features 3 sections: Happening Now, Bookmarked Events and Upcoming Events.
- The Homepage allows you to bookmark events which will immediately appear in the homepage.
- Bookmarks are persistent and will remain in LocalStorage.
- The Homepage also features the "Happening Now" display, which displays available events happening at that moment.
- As of now, there is a "Happening Event" that is happening all the time.

Added Event Description Functionality.
- Clicking on events brings you to the event description page.
- This allows for users to see the details of each event.

Added Bookmark Page Functionality.
- With bookmarks added, the bookmarks page is added as well. Users click on the bookmark icon on the top right of the homepage, and will arrive at the bookmark homepage.

## Progress Report:
We completed most of the features for regular end-users. We are beginning to work on Admin Event Creation, which will be implemented in Milestone 4. We encountered problems regarding time constraints. The 3 days we had paired with class hindered our ability to fully push functional requirements such as Admin Event Creation. We also encountered problems with unnecessary elements such as bookmark amount, which has been removed and will not be added in the full release. Overall, it was a productive Milestone, but we fell short of our target.

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
