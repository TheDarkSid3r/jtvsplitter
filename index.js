window.addEventListener("load", () => {
    const CreateClient = (roomcode) => new Promise(resolve => {
        const frame = document.createElement("iframe");
        frame.src = `https://jackbox.tv#${roomcode}`;
        frame.addEventListener("load", resolve);
        document.querySelector(".wrapper").appendChild(frame);
        console.log(frame.contentWindow.document.querySelector("input"));
    });

    const CreateClients = async (count, roomcode) => {
        for (let i = 0; i < count; i++)
            await CreateClient(roomcode);
    };

    Swal.fire({
        title: "splitter",
        input: "number",
        inputPlaceholder: "number of clients"
    }).then(r => {
        if (r.isConfirmed) {
            const clientCount = r.value;
            Swal.fire({
                title: "splitter",
                input: "text",
                inputPlaceholder: "roomcode"
            }).then(r => {
                if (r.isConfirmed) {
                    const roomcode = r.value;
                    CreateClients(clientCount, roomcode);
                }
            });
        }
    });
});