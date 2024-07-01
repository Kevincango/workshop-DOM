/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

const baseUrl = "https://platzi-avo.vercel.app";
const url = "https://platzi-avo.vercel.app/api/avo";
const app = document.querySelector('#containerInformation');

app.addEventListener('click', (event) => {
    if(event.target.nodeName === 'H2'){
        window.alert('Hello!');
    }
});

const formatPrice = (price) => {
    const newPrice = new window.Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "GBP"
    }).format(price);

    return newPrice;
}

async function callApi(){
    try{
        const response = await window.fetch(url);
        const data = await response.json();
        const items = [];

        data.data.forEach(item => {
            const image = document.createElement("img");
            image.src = `${baseUrl}${item.image}`;
            image.className = "h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6";

            const title = document.createElement("h2");
            title.className = "text-lg";
            title.textContent = item.name;

            const price = document.createElement("div");
            price.className = "text-gray-600";
            price.textContent = formatPrice(item.price);

            //creation of a container for the price and the title
            const priceAndTitle = document.createElement('div');
            priceAndTitle.className = "text-center md:text-left",
            priceAndTitle.appendChild(title);
            priceAndTitle.appendChild(price);

            //we add everything inside a card
            const card = document.createElement('div');
            card.className = "md:flex bg-white rounded-lg p-6 hover:bg-gray-300";
            card.append(image, priceAndTitle);

            const container = document.createElement('div');
            container.appendChild(card);

            items.push(container);
        });

        app.append(...items);
    }catch(error){
    console.error(error);
    }
}

callApi();
