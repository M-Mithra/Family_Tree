document.addEventListener('DOMContentLoaded', function() {
    const familyForm = document.getElementById('familyForm');

    familyForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const generations = parseInt(document.getElementById('generations').value);
        const familyData = [];

        for (let i = 1; i <= generations; i++) {
            const maleName = prompt(`Enter Male Member ${i}'s Name:`);
            const femaleName = prompt(`Enter Female Member ${i}'s Name:`);
            const childrenCount = parseInt(prompt(`How many children does ${maleName} and ${femaleName} have?`));

            const children = [];
            for (let j = 1; j <= childrenCount; j++) {
                const childName = prompt(`Enter Child ${j}'s Name:`);
                const childWifeName = prompt(`Enter ${childName}'s Wife's Name (if any):`);
                children.push({ name: childName, wife: childWifeName });
            }

            familyData.push({
                male: maleName,
                female: femaleName,
                children: children
            });
        }

        generateFamilyTree(familyData);
    });
});

function generateFamilyTree(data) {
    const familyTreeDiv = document.getElementById('familyTree');
    familyTreeDiv.innerHTML = '';

    function generateNode(member) {
        let html = `<div class="node">
                        <div class="member-pair">
                            <div class="member">${member.male}</div>
                            <div class="member">${member.female}</div>
                        </div>`;

        if (member.children.length > 0) {
            html += '<div class="children">';
            member.children.forEach(child => {
                html += `<div class="child">${child.name}`;
                if (child.wife) {
                    html += ` & ${child.wife}`;
                }
                html += `</div>`;
            });
            html += '</div>';
        }

        html += `</div>`;
        return html;
    }

    data.forEach(member => {
        familyTreeDiv.innerHTML += generateNode(member);
    });
}
