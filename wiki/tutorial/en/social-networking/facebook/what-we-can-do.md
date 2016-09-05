What We Can('t) Do
==================

# AKA The (Un)documentation
It is the hope of the author that this page will stand as an ever malleable monument to the craggy, nightmarish hellscape that is the Facebook Developer API. As blood-boiling, aneurism aggravating, capillary bursting inconsistencies and undocumented functionality are found, they shall be placed here ... a living memorium to those bold Facebook API Developers who tread in the footsteps of Dante before us. May the valiant who now lie forever silenced in the bottomless grave of misery and affliction never be forgotten.

## Wall Post / Comment Deletion
In building out the comment management back-end for Morning Glory SP4, many questions were unanswered about exactly what can and can't be deleted. I decided to try out as many combinations of comment and post deletions as I could and have compiled the following matrix below. This is not definitive, but I hope it is somewhere close. It does not take in to account the vast combinations of permissions that have been known to affect API calls, but each example consistently uses the following characters:

### Owner (The Facebook user who authorized Spredfast to interact with their Profile, Page and Group)
The owner has standard permission, but all "Post" related permission are set to "Everyone"

### Friend/Fan (A Facebook user who is a friend of the Owner and a fan of their page and member of their group)
This user has standard permissions.

### Friend/Fan (A Facebook user who is a friend of the Owner and a fan of their page and member of their group)
This user has locked-down permission with all settings set to "Friends Only."

I used a combination of the two Friend/Fans to make these tests. Unfortunately I did not have the forethought to document each one individually, however, it does end up showing us that (in the scope of post/comment deletion) permissions may be being handled correctly by Facebook.

## What We Can Delete

(what-we-can-delete.png)

* Exception #200 This post wasn't created by the application

** Although, in the end, I was able to delete a comment made by a group owner on their own post, I twice successively received the following error: Exception #210 User not visible. I kept the permissions of the Owner consistent and kept hammering the call until it worked.
In the end we can delete pretty much everything, which was uncharacteristically promising for Facebook. The only thing we seem to be completely locked out of deleting are posts made on a Facebook profile, unless they were explicitly created by the application. At first this looks like a Facebook bug, but I am quite sure it is by design.