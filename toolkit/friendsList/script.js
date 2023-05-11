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
    const inputs = document.querySelectorAll('#add-friend input:not([type=submit])');
    let thisRecord;

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
                    <i class="fas fa-times-circle" id="d-${id}"></i>`;
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

    addFriendsForm.addEventListener('submit', function(e){
        e.preventDefault();
        addFriend();
    })

    async function addFriend(){
        const newFriend = {};
        for (let i = 0; i <inputs.length; i++) {
            let key = inputs[i].getAttribute('name');
            let value = inputs[i].value;
            newFriend[key] = value;
        }
        if (newFriend.fname != "" && newFriend.lname != "" && newFriend.email != ""){
            const newFriendData = new Parse.Object('Friends');
            newFriendData.set('fname', newFriend.fname);
            newFriendData.set('lname', newFriend.lname);
            newFriendData.set('email', newFriend.email);
            newFriendData.set('facebook', newFriend.facebook);
            newFriendData.set('twitter', newFriend.twitter);
            newFriendData.set('instagram', newFriend.instagram);
            newFriendData.set('linkedin', newFriend.linkedin);
            try {
                const result = await newFriendData.save();
                console.log('friends created', result);
                resetFormFields();
                addFriendsForm.className = 'add-friend-offscreen';
                friendsList.innerHTML = '';
                displayFriends(); 
            } catch(error) {
                console.error('Error while creating friend:', error);
            }
        } else {
            addFriendsForm.className = 'add-friend-offscreen'; 
        }
    }

    // for (let i = 0; i < editBtns.length; i++) {
    //     editBtns[i].addEventListener('click', function(e){
    //         e.preventDefault();
    //         editFriendsForm.className = 'edit-friend-onscreen'
    //     })
    // }

    document.addEventListener('click', function(e){
        if (e.target.matches('.fa-edit')) {
            thisRecord = e.target.getAttribute('id').slice(2);
            setForm(thisRecord);
        }

        if (e.target.matches('.fa-times-circle')) {
            thisRecord = e.target.getAttribute('id').slice(2);
            deleteRecord(thisRecord);
        }

    }, false)

    async function setForm(recordId) {
        const friends = Parse.Object.extend('Friends');
        const query = new Parse.Query(friends);
        query.equalTo('objectId', recordId);
        try {
            const results = await query.find();
            results.forEach(function(thisFriend){
                document.querySelector('#fname-edit').value = thisFriend.get('fname');
                document.querySelector('#lname-edit').value = thisFriend.get('lname');
                document.querySelector('#email-edit').value = thisFriend.get('email');
                document.querySelector('#fbook-edit').value = thisFriend.get('facebook');
                document.querySelector('#twitter-edit').value = thisFriend.get('twitter');
                document.querySelector('#insta-edit').value = thisFriend.get('instagram');
                document.querySelector('#linkedin-edit').value = thisFriend.get('linkedin');
            });
            editFriendsForm.className = 'edit-friend-onscreen';
        } catch (error) {
            console.error('Error while fetching Friends', error);
        } 
    }


    editFriendsForm.addEventListener('submit', function(e){
        e.preventDefault();
        updateRecord(thisRecord);
    })

    async function updateRecord(recordId) {
        const theFields = document.querySelectorAll('#edit-friend input:not([type=submit])');
        const editedRecord = {};
        let key;
        let value;
        for (let i = 0; i < theFields.length; i++){
            key = theFields[i].getAttribute('name');
            value = theFields[i].value;
            editedRecord[key] = value;
        }
        const friends = Parse.Object.extend('Friends');
        const query = new Parse.Query(friends);
        try {
            const object = await query.get(recordId);
            object.set('fname', editedRecord.fname);
            object.set('lname', editedRecord.lname);
            object.set('email', editedRecord.email);
            object.set('facebook', editedRecord.facebook);
            object.set('twitter', editedRecord.twitter);
            object.set('instagram', editedRecord.instagram);
            object.set('linkedin', editedRecord.linkedin);
            try {
                await object.save();
                editFriendsForm.className = 'edit-friend-offscreen';
                friendsList.innerHTML = '';
                displayFriends();
            } catch(error) {
                console.error('Error while updating friends', error);
            }

        } catch(error) {
            console.error('Error while retrieving object friends', error);
        }
    }

    async function deleteRecord(recordId) {
        const youAreSure = confirm(
            'Are you sure you want to delete this record?'
        );
        if (youAreSure) {
            const query = new Parse.Query('Friends');
            try{
                const object = await query.get(recordId);
                try {
                    await object.destroy();
                    document.getElementById(`r-${recordId}`).className = 'remove'; 
                    setTimeout(function() {
                        const elem = document.getElementById(`r-${recordId}`);
                        elem.parentNode.removeChild(elem);
                    }, 1500)
                } catch (error) {
                    console.error('Error while deleting ParseObject', error);
                }
            } catch (error) {
                console.error('Error while retrieving ParseObject', error);
            }
        }
    }

    // Helper Functions
    function resetFormFields(){
        document.querySelector('#fname').value = '';
        document.querySelector('#lname').value = '';
        document.querySelector('#email').value = '';
        document.querySelector('#fbook').value = 'https://facebook.com';
        document.querySelector('#twitter').value = 'https://twitter.com';
        document.querySelector('#insta').value = 'https://instagram.com';
        document.querySelector('#linkedin').value = 'https://linkedin.com';
    }


}())