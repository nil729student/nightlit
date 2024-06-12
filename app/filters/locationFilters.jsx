

export default function serchClubs(clubs, search) {
    return (
        <div>
            <input type="text" placeholder="Search Club" onChange={(e) => search(e.target.value)} />
            <ul>
                {clubs.map((club) => (
                    <li key={club.id}>{club.name}</li>
                ))}
            </ul>
        </div>
    );
}


