import React from "react";
import $ from "jquery";
export function Scores() {
    React.useEffect(()=>{
        
    fetch("/api/score") // path to JSON
        .then((response) => response.json())
        .then((data) => {
            data.sort((a, b) => a.moves - b.moves); 
            data.forEach((row, index) => {
            if (index === 0) {
                row.rank = 1;
            } else if (row.moves === data[index - 1].moves) {
                row.rank = data[index - 1].rank;
            } else {
                row.rank = data[index - 1].rank + 1;
            }
        });
    data.forEach((row) => {
        $("#example").append(
            "<tr>" +
            "<td>" + row.rank + "</td>" +
            "<td>" + row.moves + "</td>" +
            "<td>" + row.username + "</td>" + 
            "</tr>"
        );
    });
    $("#example").DataTable({
        autoWidth: true,
        scrollY: true,
        scrollX: true,
        dom: '<lf<t>Bip>',
        lengthMenu: [
            [10,20,25,50,-1], 
            [10,20,25,50,"All"]
        ],
        columnDefs: [
            {"width" : "100px", "targets": 0},
            {"width" : "250px", "targets": 1},
        ],
        buttons: [
            'csv', 
            {
            extend: 'pdfHtml5',
            orientation: 'landscape',
            pageSize: 'LEGAL'
            },
        ],
        });
    });

    fetch('https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit')
        .then(res=>res.json())
        .then(jokeData=>{
        if (jokeData.type == 'single'){
            console.log(jokeData.joke);
        } else{
            console.log(jokeData.setup);
            console.log('...');
            setTimeout(()=>console.log('\t- '+jokeData.delivery), 5000);
        }
        });
    });
    return (
        <main>
        <div className="container py-5 px-5  w-50" id="container">
            <table id="example" className="table table-striped hover" style={{width: "100%"}}>
            <thead>
                <tr>
                <th>Rank</th>
                <th>Moves</th>
                <th>Username</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
            <tfoot>
                <tr>
                <th>Rank</th>
                <th>Moves</th>
                <th>Username</th>
                </tr>
            </tfoot>
            </table>
        </div>
    
    
        
            <a href="/play" className="btn btn-danger btn-lg">Play Game!</a>
            <a href="/auth/logout" className="btn btn-primary btn-sm border-white">Log Out</a>
        </main>
    );
}