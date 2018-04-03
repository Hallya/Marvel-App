**Familiarization with React.Js, Redux & use of the MARVEL's API**
=================================================================

**Synopsis**
------------

The website is only coded in JavaScript and allows to get selections of characters and comics from the *Marvel* API.


**Features**
-------------------

The interface offers the following possibilities:

* Search for any heroes thanks to the searchbar
* Filtered displayed results by image or description
* Get a list of heroes/comics filtered by letter
* Get the list and number of comics/heroes related to the hero/comic you've clicked on
* Preservation of filters in any situation
* Get more results easily by simply reaching the bottom of the actual displayed list
* Choose which infos you want between the description or the related data of the actual hero/comic


**How it works**
------------------

An initial content is generated asking you to choose which category you want to browse in.

The API is then queried using a precise URL including a public key obtained by creating an account on the developer part of the *MARVEL* website.

Depending on the query, the API will return data through which we will iterate to make each hero/comic.

The filtering (disappearance from the page) is done by modifying the *display* of each hero possessing a class in relation to its absence of picture, description or both. The attribution of these classes is done by a match using regular expressions or a blank detected.

When browsing, all the request you make are fetched once, after that you'll get the data from cache.
