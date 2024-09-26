import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', async () => {
    const jobList = document.getElementById('all-jobs');
    const characterList = document.getElementById('character-list');
    const addCharacterForm = document.getElementById('add-character-form');
    const characterNameInput = document.getElementById('character-name');
    const characterJobSelect = document.getElementById('character-job');

    // Fetch and display all jobs
    const jobs = await backend.getAllJobs();
    jobs.forEach(job => {
        const li = document.createElement('li');
        li.textContent = job;
        jobList.appendChild(li);

        const option = document.createElement('option');
        option.value = job;
        option.textContent = job;
        characterJobSelect.appendChild(option);
    });

    // Function to fetch and display all characters
    async function displayCharacters() {
        const characters = await backend.getAllCharacters();
        characterList.innerHTML = '';
        characters.forEach(character => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${character.name}</strong> - ${character.job}
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
        if (name && job) {
            await backend.addCharacter(name, job);
            characterNameInput.value = '';
            characterJobSelect.value = '';
            displayCharacters();
        }
    });
});
