export const getSender = (loggedUser,users) => {
    console.log('loggedUser',loggedUser)
    console.log('users',users)
    return users[0]._id === loggedUser.userId ? users[1].firstName : users[0].firstName;
}