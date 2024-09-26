import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', async () => {
    const jobList = document.getElementById('all-jobs');
    const characterList = document.getElementById('character-list');
    const addCharacterForm = document.getElementById('add-character-form');
    const characterNameInput = document.getElementById('character-name');
    const characterJobSelect = document.getElementById('character-job');
    const characterRaceSelect = document.getElementById('character-race');
    const characterGenderSelect = document.getElementById('character-gender');
    const characterStartingCitySelect = document.getElementById('character-starting-city');
    const ffHeroDiv = document.getElementById('ff-hero');

    // Fetch and display all jobs with descriptions
    const jobs = await backend.getAllJobs();
    jobs.forEach(job => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${job.name}</strong>: ${job.description}`;
        jobList.appendChild(li);

        const option = document.createElement('option');
        option.value = job.name;
        option.textContent = job.name;
        characterJobSelect.appendChild(option);
    });

    // Fetch and populate races
    const races = await backend.getAllRaces();
    races.forEach(race => {
        const option = document.createElement('option');
        option.value = race;
        option.textContent = race;
        characterRaceSelect.appendChild(option);
    });

    // Fetch and populate starting cities
    const startingCities = await backend.getAllStartingCities();
    startingCities.forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        option.textContent = city;
        characterStartingCitySelect.appendChild(option);
    });

    // Fetch and display Final Fantasy hero
    const ffHero = await backend.getFFHero();
    ffHeroDiv.innerHTML = `
        <h3>Featured Hero: ${ffHero.name}</h3>
        <p>${ffHero.description}</p>
    `;

    // Function to fetch and display all characters
    async function displayCharacters() {
        const characters = await backend.getAllCharacters();
        characterList.innerHTML = '';
        characters.forEach(character => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${character.name}</strong> - ${character.job}<br>
                Race: ${character.race}, Gender: ${character.gender}, Starting City: ${character.startingCity}
                <button class="update-job" data-id="${character.id}">Update Job</button>
            `;
            characterList.appendChild(li);
        });

        // Add event listeners for update buttons
        document.querySelectorAll('.update-job').forEach(button => {
            button.addEventListener('click', async (e) => {
                const id = parseInt(e.target.getAttribute('data-id'));
                const newJob = prompt('Enter new job:');
                if (newJob) {
                    await backend.updateCharacterJob(id, newJob);
                    displayCharacters();
                }
            });
        });
    }

    // Display initial characters
    displayCharacters();

    // Add new character
    addCharacterForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = characterNameInput.value;
        const job = characterJobSelect.value;
        const race = characterRaceSelect.value;
        const gender = characterGenderSelect.value;
        const startingCity = characterStartingCitySelect.value;
        if (name && job && race && gender && startingCity) {
            await backend.addCharacter(name, job, race, gender, startingCity);
            characterNameInput.value = '';
            characterJobSelect.value = '';
            characterRaceSelect.value = '';
            characterGenderSelect.value = '';
            characterStartingCitySelect.value = '';
            displayCharacters();
        }
    });
});
