(function(){
    'use strict';
    console.log('reading js');

    Parse.initialize("F1itGgPjsK8XkNiZWAImnwo7JISigqyEB7WNPjMI","mEOTrCBeDzy8w4VbmR9gz1qs4pYuiZaaLfVFUB5O");
    Parse.serverURL = 'https://parseapi.back4app.com/'

    const newBtn = document.querySelector('#newbtn');
    const editBtns = document.querySelectorAll('.fa-edit');
    const addFriendsForm = document.querySelector('#add-friend');
    const editFriendsForm = document.querySelector('#edit-friend');
    const friendsList = document.querySelector('main ol');

    async function displayFriends() {
        const friends = Parse.Object.extend('Friends');
        const query = new Parse.Query(friends);
        try {
            const results = await query.ascending('lname').find();

            results.forEach(function(eachFriend){
                const id = eachFriend.id;
                const lname = eachFriend.get('lname');
                const fname = eachFriend.get('fname');
                const email = eachFriend.get('email');
                const facebook = eachFriend.get('facebook');
                const twitter = eachFriend.get('twitter');
                const instagram = eachFriend.get('instagram');
                const linkedin = eachFriend.get('linkedin');

                const theListItem = document.createElement('li');
                theListItem.setAttribute('id', `r-${id}`);
                theListItem.innerHTML = `
                <div class="name">
                        ${fname} ${lname}
                    </div>
                    <div class="email">
                        <i class="fas fa-envelope-square"></i> ${email}
                    </div>
                    <div class="social">
                        <a href="${facebook}"><i class="fab fa-facebook-square"></i></a>
                        <a href="${twitter}"><i class="fab fa-twitter-square"></i></a>
                        <a href="${instagram}"><i class="fab fa-instagram"></i></a>
                        <a href="${linkedin}"><i class="fab fa-linkedin"></i></a>
                    </div>
                    <i class="fas fa-edit" id="e-${id}"></i>
                    <i class="fas fa-times-circle" id="d-${id}></i>`;
                    friendsList.append(theListItem);
            })
        } catch(error) {
            console.error('Error while fetching Friends', error);
        }
    }

    displayFriends();

    newBtn.addEventListener('click', function(e){
        e.preventDefault();
        addFriendsForm.className = 'add-friend-onscreen';
    })

    addFriendsForm.addEventListener('click', function(e){
        e.preventDefault();
        addFriendsForm.className = 'add-friend-offscreen';
    })

    for (let i = 0; i < editBtns.length; i++) {
        editBtns[i].addEventListener('click', function(e){
            e.preventDefault();
            editFriendsForm.className = 'edit-friend-onscreen'
        })
    }

    editFriendsForm.addEventListener('click', function(e){
        e.preventDefault();
        editFriendsForm.className = 'edit-friend-offscreen';
    })


}())