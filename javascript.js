"use strict";

// Accordion
$(function () {
    $("#accordion").accordion();
});


// Movies API
function loadPopularMovies() {
    const popularMoviesContainer = $("#popularMovies");
    const imgUrl = `https://image.tmdb.org/t/p/w400/`;
    const urlStart = `https://api.themoviedb.org/3/movie/popular?api_key=`;
    const apiKey = "5846e9f3bd5792b51a6ff4d4ce255a04";
    const urlEnd = `&language=en-US&page=1`;

    $.ajax({
        url: `${urlStart}${apiKey}${urlEnd}`,
        dataType: "json"
    }).done(function (data) {
        let html = "";

        for (let i = 0; i < 20; i++) {
            html += `
          <section class="movie">
            <img src="${imgUrl}${data.results[i].poster_path}" alt="${data.results[i].title}">
            <h5>${data.results[i].title}</h5>
            <button onclick="window.open('https://order.grillonmain.net/menu', '_blank')">Pair a meal with this movie</button>
          </section>`;
        }

        popularMoviesContainer.html(html);

    }).fail(function (jqXHR) {
        popularMoviesContainer.html("There was a problem loading movies.");
        console.error(jqXHR.responseJSON.status_message);
    });
}

// Call loadPopularMovies function on page load
$(document).ready(function () {
    loadPopularMovies();
});

// Web Storage
// Function to handle the newsletter signup
function storeEmail(e) {
    // Prevent default form submission
    e.preventDefault();

    // The place where we'll display our message to the user
    let outputP = document.getElementById("newsletterMsg");

    // The input for the email
    let emailInput = document.getElementById("email");

    // The error message span
    let errorSpan = document.querySelector("#newsletterForm .message");

    // Clear out previous error message/style before revalidating
    emailInput.classList.remove("errorInput");
    errorSpan.classList.remove("error");

    // Validate input (make sure it's a valid email format)
    let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(emailInput.value)) {
        emailInput.classList.add("errorInput");
        errorSpan.classList.add("error");
        outputP.innerHTML = "Please enter a valid email address.";
    } else {
        let storedEmail = localStorage.getItem("newsletterEmail");

        if (storedEmail === emailInput.value) {
            // Display the "already subscribed" message
            outputP.innerHTML = `${storedEmail} is already subscribed to this newsletter.`;
        } else {
            // We have a new email to subscribe, so let's write it to localStorage.
            localStorage.setItem("newsletterEmail", emailInput.value);

            // Display a welcome message to the user
            outputP.innerHTML = `Thank you for subscribing!`;
        }

        // Clear out the form
        emailInput.value = "";
    }
}

// Event listener for the newsletter signup form submission
document.getElementById("newsletterSubmit").addEventListener("click", storeEmail);

// Check if there's an email stored in localStorage and display a message if it exists
window.onload = function () {
    let outputP = document.getElementById("newsletterMsg");
    let storedEmail = localStorage.getItem("newsletterEmail");

    if (storedEmail) {
        outputP.innerHTML = `${storedEmail} is already subscribed to this newsletter.`;
    } else {
        outputP.innerHTML = ""; // Clear the message if no email is stored
    }
};


// Image Carousel
$(document).ready(function () {
    let currentSlide = 0;
    const totalSlides = $('#img-gallery img').length;

    // Hide all images and show the first one
    $('#img-gallery img').hide();
    $('#img-gallery img').eq(currentSlide).show();

    // Next button click event
    $('.next-btn').click(function () {
        $('#img-gallery img').eq(currentSlide).hide();
        currentSlide = (currentSlide + 1) % totalSlides; // Loop back to the first image if at the end
        $('#img-gallery img').eq(currentSlide).show();
    });

    // Previous button click event
    $('.prev-btn').click(function () {
        $('#img-gallery img').eq(currentSlide).hide();
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides; // Loop back to the last image if at the beginning
        $('#img-gallery img').eq(currentSlide).show();
    });
});






