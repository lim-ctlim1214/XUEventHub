
/* 
   XU EVENTHUB - EVENT DESCRIPTION PAGE
 */

document.addEventListener("DOMContentLoaded", function () {


    // 1. EVENT INFORMATION


    const events = {
        "football-eng-sbm": {
            name: "Football - ENG v. SBM",
            bannerDate: "October 19",
            date: "October 19, 2026",
            time: "8:00 AM"
        },

        "volleyball-ccs-nsg": {
            name: "Volleyball - CCS v. NSG",
            bannerDate: "October 19",
            date: "October 19, 2026",
            time: "9:00 AM"
        },

        "pickleball-ccs-law": {
            name: "Pickleball - CCS v. LAW",
            bannerDate: "October 19",
            date: "October 19, 2026",
            time: "9:00 AM"
        },

        "basketball-ccs-sbm": {
            name: "Basketball - CCS v. SBM",
            bannerDate: "October 21",
            date: "October 21, 2026",
            time: "9:00 AM"
        }
    };



    // 2. DISPLAY SELECTED EVENT


    const selectedEventId = new URLSearchParams(
        window.location.search
    ).get("event");

    const selectedEvent = events[selectedEventId];

    if (selectedEvent) {

        // Change the browser tab title
        document.title = selectedEvent.name + " | XU EventHub";

        // Change the event banner
        document.querySelector(".event-banner h1").textContent =
            selectedEvent.name;

        document.querySelector(".event-banner p").textContent =
            selectedEvent.bannerDate;

        // Change the About Event description
        document.querySelector(".event-about-description").textContent =
            selectedEvent.name +
            " is a secondary event under The Xavier Cup, " +
            "held at Xavier University - Ateneo de Cagayan.";

        // The 135 bookmark count belongs to the sample primary event.
        // Hide it until individual event bookmark counts are available.
        document.querySelector(".bookmark-count").hidden = true;

        // Show only the date and time details for this secondary event.
        const quickDetailParagraphs = document.querySelectorAll(
            ".quick-details p"
        );

        quickDetailParagraphs.forEach(function (paragraph) {

            const label = paragraph.querySelector("strong");

            if (!label) {
                return;
            }

            const detailName = label.textContent
                .replace(":", "")
                .trim()
                .toLowerCase();

            if (detailName === "date") {
                paragraph.innerHTML =
                    "<strong>Date:</strong> " + selectedEvent.date;
            }

            else if (detailName === "time") {
                paragraph.innerHTML =
                    "<strong>Time:</strong> " + selectedEvent.time;
            }

            else {
                paragraph.hidden = true;
            }

        });

    }


// 3. BACK BUTTON

const backButton = document.querySelector(".back-button");

backButton.addEventListener("click", function () {

    const returnPage = sessionStorage.getItem(
        "xuEventHubReturnPage"
    );

    if (returnPage) {

        sessionStorage.removeItem("xuEventHubReturnPage");
        window.location.href = returnPage;

    } else {

        window.location.href = "index.html";

    }

});


    // 4. BOOKMARK FUNCTIONALITY


    const bookmarkButtons = document.querySelectorAll(
        ".event-bookmark-button"
    );

    const storageKey = "xuEventHubBookmarks";


    // Retrieve existing bookmarks from LocalStorage
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


    // Save bookmarks to LocalStorage
    function saveBookmarks(bookmarks) {

        localStorage.setItem(
            storageKey,
            JSON.stringify(bookmarks)
        );

    }


    // Update the bookmark button appearance
    function updateBookmarkButton(button, isBookmarked) {

        const icon = button.querySelector("i");

        if (isBookmarked) {

            icon.classList.remove("fa-regular");
            icon.classList.add("fa-solid");

            button.setAttribute("aria-pressed", "true");
            button.setAttribute("aria-label", "Remove bookmark");

        } else {

            icon.classList.remove("fa-solid");
            icon.classList.add("fa-regular");

            button.setAttribute("aria-pressed", "false");
            button.setAttribute("aria-label", "Add bookmark");

        }

    }


    // Restore saved bookmark states
    const existingBookmarks = getBookmarks();

    bookmarkButtons.forEach(function (button) {

        const eventId = button.dataset.eventId;

        updateBookmarkButton(
            button,
            existingBookmarks.includes(eventId)
        );

        button.addEventListener("click", function () {

            let bookmarks = getBookmarks();

            if (bookmarks.includes(eventId)) {

                // Remove bookmark
                bookmarks = bookmarks.filter(function (id) {
                    return id !== eventId;
                });

                updateBookmarkButton(button, false);

            } else {

                // Add bookmark
                bookmarks.push(eventId);

                updateBookmarkButton(button, true);

            }

            saveBookmarks(bookmarks);

        });

    });


    // PRIMARY EVENT BOOKMARK FUNCTIONALITY


    const primaryBookmarkButton = document.querySelector(
        ".primary-event-bookmark-button"
    );

    if (primaryBookmarkButton) {

        const primaryEventId = primaryBookmarkButton.dataset.eventId;

        // Restore the saved primary event bookmark state
        updateBookmarkButton(
            primaryBookmarkButton,
            getBookmarks().includes(primaryEventId)
        );

        primaryBookmarkButton.addEventListener("click", function () {

            let bookmarks = getBookmarks();

            if (bookmarks.includes(primaryEventId)) {

                // Remove primary event bookmark
                bookmarks = bookmarks.filter(function (id) {
                    return id !== primaryEventId;
                });

                updateBookmarkButton(primaryBookmarkButton, false);

            } else {

                // Add primary event bookmark
                bookmarks.push(primaryEventId);

                updateBookmarkButton(primaryBookmarkButton, true);

            }

            saveBookmarks(bookmarks);

        });

    }


    // 5. SECONDARY EVENT NAVIGATION


    const secondaryEventCards = document.querySelectorAll(
        ".secondary-event-card"
    );

    secondaryEventCards.forEach(function (card) {

        card.addEventListener("click", function (event) {

            // Do not navigate when the bookmark button is clicked
            if (event.target.closest(".event-bookmark-button")) {
                return;
            }

            const eventId = card.dataset.eventId;

            window.location.href =
                "event-description.html?event=" +
                encodeURIComponent(eventId);

        });

    });



    // 6. BACK TO TOP


    const backToTopButton = document.querySelector(
        ".back-to-top-button"
    );

    backToTopButton.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });



    // 7. SHOW MORE


    const showMoreButton = document.querySelector(
        ".show-more-button"
    );

    const secondaryEventList = document.querySelector(
        ".secondary-event-list"
    );

    showMoreButton.addEventListener("click", function () {

        const hiddenEvents = secondaryEventList.querySelectorAll(
            ".secondary-event-card[hidden]"
        );

        if (hiddenEvents.length > 0) {

            hiddenEvents.forEach(function (event) {
                event.hidden = false;
            });

            showMoreButton.innerHTML =
                'Show less <i class="fa-solid fa-chevron-up"></i>';

        } else {

            const allEvents = secondaryEventList.querySelectorAll(
                ".secondary-event-card"
            );

            if (allEvents.length > 4) {

                allEvents.forEach(function (event, index) {
                    event.hidden = index >= 4;
                });

                showMoreButton.innerHTML =
                    'Show more <i class="fa-solid fa-chevron-down"></i>';

            } else {

                showMoreButton.title =
                    "All available secondary events are displayed.";

            }

        }

    });

});
