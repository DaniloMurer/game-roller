# game-roller
Discord Bot for adding gaming roles to members based on their interest

## Members: How to use it?

The normal server members can use follwing commands:

- join `%game join GAME_NAME` join a game
- leave `%game leave GAME_NAME` leave a game
- list `%game list` show supported games

After joining a game, the respective channels should be visible/accessible for the members.

After leaving a game, the respective channels shoud be hidden/not accessible

With the list command a member can see which games are available at the moment:

![embed-logo](assets/SNAG-0908.png)

<b>Those commands do only work when the server has those roles created</b>.


## Admins: How to use it?

The administrators of the server can use the "Member" commands but also can you following commands:

- add `%game add GAME_NAME`
- remove `%game remove GAME_NAME`

After adding a game, the game is accessible for the members. The channels are created automatically and the permissions are being applied.

After removing a game, the game is not accessible anymore. The channels and the roles are going to be deleted.
