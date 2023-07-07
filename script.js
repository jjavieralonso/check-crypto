fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd')
    .then(response => response.json())
    .then(data => {
        const cryptoTable = document.getElementById('crypto-table');
        const searchInput = document.getElementById('search-input');

        function updateTable() {
            const searchText = searchInput.value.toLowerCase();

            const filteredData = data.filter(crypto => crypto.name.toLowerCase().includes(searchText));
            cryptoTable.innerHTML = ''; //limpia la tabla antes de generarla
            const row = document.createElement('tr');
            const logoTh = document.createElement('th');
            const nameTh = document.createElement('th');
            const priceTh = document.createElement('th');
            const high24Th = document.createElement('th');
            const low24Th = document.createElement('th');
            const porcentage24Th = document.createElement('th');

            logoTh.textContent = '';
            nameTh.textContent = 'Nombre';
            priceTh.textContent = 'Precio';
            high24Th.textContent = 'Precio más alto (24h)';
            low24Th.textContent = 'Precio más bajo (24h)';
            porcentage24Th.textContent = '% (24h)';

            row.appendChild(logoTh);
            row.appendChild(nameTh);
            row.appendChild(priceTh);
            row.appendChild(high24Th);
            row.appendChild(low24Th);
            row.appendChild(porcentage24Th);
            cryptoTable.appendChild(row);


            filteredData.forEach(crypto => { //segun si esta filtrando o no, genera la fila de la crypto
                const row = document.createElement('tr');
                const logoCell = document.createElement('td');
                const nameCell = document.createElement('td');
                const priceCell = document.createElement('td');
                const high24hCell = document.createElement('td');
                const low24hCell = document.createElement('td');
                const priceChange24hCell = document.createElement('td');
                const logoImg = document.createElement('img');

                logoImg.src = crypto.image;
                logoImg.alt = crypto.name;
                logoImg.classList.add('crypto-logo');

                nameCell.textContent = crypto.name;
                nameCell.classList.add('crypto-name');

                priceCell.textContent = `$${crypto.current_price}`;
                priceCell.classList.add('crypto-price');

                high24hCell.textContent = `$${crypto.high_24h}`;
                low24hCell.textContent = `$${crypto.low_24h}`;

                priceChange24hCell.textContent = `${crypto.price_change_percentage_24h.toFixed(2)}%`;
                if (crypto.price_change_percentage_24h < 0) {
                    priceChange24hCell.classList.add('crypto-price-change-negative');
                } else {
                    priceChange24hCell.classList.add('crypto-price-change-positive');
                }

                logoCell.appendChild(logoImg);

                row.appendChild(logoCell);
                row.appendChild(nameCell);
                row.appendChild(priceCell);
                row.appendChild(high24hCell);
                row.appendChild(low24hCell);
                row.appendChild(priceChange24hCell);

                cryptoTable.appendChild(row);
            });
        }

        searchInput.addEventListener('input', updateTable); //cada vez que se actualice el input para buscar por nombre, hace un update de la tabla

        updateTable();
    })
    .catch(error => console.log(error));