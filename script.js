const shortenInput = document.querySelector('.shorten-input');
const shortenButton = document.querySelector('.shorten-button');
const apiUrl = 'https://api.shrtco.de/v2/shorten?url=';
const urlList = document.querySelector('.url-list');
const shortenUrl = document.querySelector('.shorten-url');
const errorMSg = document.querySelector('.error-msg');

const App = {


    shortenLink: () => {
        console.log('shorten button clicked');
        const url = apiUrl + shortenInput.value;


        fetch(url, {
            method: 'POST', // or 'PUT'
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);

                if (!data.error) {
                    let newShortUrl = data.result.full_short_link2;
                    const existingButton = document.querySelector(`[data-url="${newShortUrl}"]`);
                    if (existingButton) {
                        errorMSg.innerHTML = 'This URL already exist';
                        //print error: This URL already exist!
                        console.log('This URL already exist!');
                    } else {
                        App.printShortenLink(data);
                        errorMSg.innerHTML = '';
                    }
                } else {
                    errorMSg.innerHTML = data.error;
                }




            })
            .catch((error) => {
                console.error('Error:', error);
            });

    },

    printShortenLink: (data) => {
        let res = '';
        let newInput = `<div class="shorten-url">
        <span class="original-url">${shortenInput.value}</span>
        <div class="url-right">
          <span class="transformed-url">${data.result.full_short_link2}</span>
          <button class="btn url-button" data-url="${data.result.full_short_link2}" onclick="App.copyToClipboard('${data.result.full_short_link2}')">Copy</button>
        </div>
      </div>`;

        res = res + newInput;
        urlList.innerHTML = urlList.innerHTML + res;


    },

    copyToClipboard: (url) => {


        if (navigator.clipboard) {

            navigator.clipboard.writeText(url).then(function () {
                console.log('Async: Copying to clipboard was successful!');
                const selectedButton = document.querySelector(`[data-url="${url}"]`);

                document.querySelectorAll('.url-button').forEach((el, idx) => {
                    el.classList.remove('selected');
                    el.innerHTML = `Copy`;
                })


                selectedButton.innerHTML = `Copied`;
                selectedButton.classList.add('selected');
            }, function (err) {
                console.error('Async: Could not copy text: ', err);
            });
        }
    }

}




shortenButton.addEventListener('click', App.shortenLink);

document.addEventListener("DOMContentLoaded", () => {


    // var text = "Example text to appear on clipboard";

    // if (navigator.clipboard) {
    //     // yes 😎 
    //     navigator.clipboard.writeText(text).then(function () {
    //         console.log('Async: Copying to clipboard was successful!');
    //     }, function (err) {
    //         console.error('Async: Could not copy text: ', err);
    //     });
    // }



});

