const mockRes =  Array.from({length: 100}).map((_, i) => ({
        id: i+1,
        name: `repo-${i+1}-abc`,
        description: `this is description for repo-${i+1}-abc`,
        stars: Math.floor(Math.random() * 1000)
}));


export function fetchRepos({searchText="", sortBy="id", sortOrder="asc", page=1, perPage=10}) {

    return new Promise((ress) => {

        const filteredData = [];
        if (searchText) {
            filteredData = mockRes.filter((item) => item.name.includes(searchText));
        }
       
        ress(filteredData);
    })
}