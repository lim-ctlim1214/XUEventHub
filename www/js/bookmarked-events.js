
/*
   XU EVENTHUB - BOOKMARKED EVENTS PAGE
 */

document.addEventListener("DOMContentLoaded", function () {


    // 1. EVENT DATA


    const storageKey = "xuEventHubBookmarks";

    // Secondary events shown in the Event Description page
    const secondaryEvents = {
        "football-eng-sbm": {
            name: "Football - ENG v. SBM",
            parent: "The Xavier Cup",
            date: "October 19, 2026",
            time: "8:00 AM"
        },

        "volleyball-ccs-nsg": {
            name: "Volleyball - CCS v. NSG",
            parent: "The Xavier Cup",
            date: "October 19, 2026",
            time: "9:00 AM"
        },

        "pickleball-ccs-law": {
            name: "Pickleball - CCS v. LAW",
            parent: "The Xavier Cup",
            date: "October 19, 2026",
            time: "9:00 AM"
        },

        "basketball-ccs-sbm": {
            name: "Basketball - CCS v. SBM",
            parent: "The Xavier Cup",
            date: "October 21, 2026",
            time: "9:00 AM"
        }
    };


    // Primary event information
    // The Xavier Cup will be connected to its bookmark
    // button when primary-event bookmarking is implemented.
    const primaryEvents = {
        "xavier-cup": {
            name: "The Xavier Cup",
            date: "October 17 - October 24, 2026"
        }
    };



    // 2. LOCALSTORAGE


    function getBookmarks() {

        try {

            const savedBookmarks = JSON.parse(
                localStorage.getItem(storageKey)
            );

            return Array.isArray(savedBookmarks)
                ? savedBookmarks
                : [];

        } catch (error) {

            console.error("Unable to read bookmarks:", error);
            return [];

        }

    }



    // 3. PAGE ELEMENTS


    const primaryList = document.querySelector(
        "#bookmarked-primary-list"
    );

    const secondaryList = document.querySelector(
        "#bookmarked-secondary-list"
    );

    const primaryShowAll = document.querySelector(
        ".primary-show-all"
    );

    const secondaryShowAll = document.querySelector(
        ".secondary-show-all"
    );



    // 4. CREATE EMPTY MESSAGES


    function showEmptyMessage(container, message) {

        const emptyMessage = document.createElement("p");

        emptyMessage.className = "empty-bookmarks-message";
        emptyMessage.textContent = message;

        container.appendChild(emptyMessage);

    }



    // 5. PRIMARY EVENT DISPLAY


    function displayPrimaryEvents(bookmarks) {

        const savedPrimaryEvents = bookmarks.filter(function (id) {
            return primaryEvents[id];
        });

        if (savedPrimaryEvents.length === 0) {

            showEmptyMessage(
                primaryList,
                "No bookmarked primary events yet."
            );

            primaryShowAll.hidden = true;
            return;

        }

        savedPrimaryEvents.forEach(function (eventId, index) {

            const event = primaryEvents[eventId];

            const card = document.createElement("article");
            card.className = "bookmarked-primary-card";

            const details = document.createElement("div");
            details.className = "bookmarked-primary-details";

            const title = document.createElement("h3");
            title.textContent = event.name;

            const date = document.createElement("p");
            date.textContent = event.date;

            details.appendChild(title);
            details.appendChild(date);
            card.appendChild(details);

            card.addEventListener("click", function () {

    sessionStorage.setItem(
        "xuEventHubReturnPage",
        "bookmarked-events.html"
    );

    window.location.href =
        "event-description.html";

});

            if (index >= 3) {
                card.hidden = true;
            }

            primaryList.appendChild(card);

        });

        primaryShowAll.hidden = savedPrimaryEvents.length <= 3;

    }



    // 6. SECONDARY EVENT DISPLAY


    function displaySecondaryEvents(bookmarks) {

        const savedSecondaryEvents = bookmarks.filter(function (id) {
            return secondaryEvents[id];
        });

        if (savedSecondaryEvents.length === 0) {

            showEmptyMessage(
                secondaryList,
                "No bookmarked secondary events yet."
            );

            secondaryShowAll.hidden = true;
            return;

        }

        savedSecondaryEvents.forEach(function (eventId, index) {

            const event = secondaryEvents[eventId];

            const card = document.createElement("article");
            card.className = "bookmarked-secondary-card";

            const details = document.createElement("div");
            details.className = "bookmarked-secondary-details";

            const title = document.createElement("h3");
            title.textContent = event.name;

            const description = document.createElement("p");
            description.textContent =
                event.parent + " - " +
                event.date + " @ " +
                event.time;

            details.appendChild(title);
            details.appendChild(description);
            card.appendChild(details);

            card.addEventListener("click", function () {

    sessionStorage.setItem(
        "xuEventHubReturnPage",
        "bookmarked-events.html"
    );

    window.location.href =
        "event-description.html?event=" +
        encodeURIComponent(eventId);

});

            if (index >= 3) {
                card.hidden = true;
            }

            secondaryList.appendChild(card);

        });

        secondaryShowAll.hidden = savedSecondaryEvents.length <= 3;

    }



    // 7. SHOW ALL FUNCTIONALITY


    function setupShowAll(button, container) {

        button.addEventListener("click", function () {

            const hiddenCards = container.querySelectorAll(
                "article[hidden]"
            );

            if (hiddenCards.length > 0) {

                hiddenCards.forEach(function (card) {
                    card.hidden = false;
                });

                button.innerHTML =
                    'Show less <i class="fa-solid fa-chevron-up"></i>';

            } else {

                const allCards = container.querySelectorAll("article");

                allCards.forEach(function (card, index) {
                    card.hidden = index >= 3;
                });

                button.innerHTML =
                    'Show all <i class="fa-solid fa-chevron-down"></i>';

            }

        });

    }



    // 8. BACK BUTTON


    const backButton = document.querySelector(".back-button");

    backButton.addEventListener("click", function () {

        if (window.history.length > 1) {
            window.history.back();
        } else {
            window.location.href = "index.html";
        }

    });



    // 9. LOAD BOOKMARKED EVENTS


    const bookmarks = getBookmarks();

    displayPrimaryEvents(bookmarks);
    displaySecondaryEvents(bookmarks);

    setupShowAll(primaryShowAll, primaryList);
    setupShowAll(secondaryShowAll, secondaryList);

});
