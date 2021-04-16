const router = require('express').Router();
const {Rotation} = require('../../db/mongoose');
const {RiotRotationClient} = require('../../riot');

router
    .route('/champion-rotations')
    .get((req, res, next) => {
        // Use find method from Rotation model to find all Rotations entities. (no pagination).
        Rotation.find()
            .then((data) => {
                // If query successful, send the complete collection via the response in json.
                res.json(data);
            })
            .catch((e) => {
                // Use next function (from .get method argument) to forward the exception to the next middleware of express.
                next(e);
            })
        ;
    })
    .post((req, res, next) => {
        // const testData = {
        //     maxNewPlayerLevel: '1',
        //     freeChampionIdsForNewPlayers: [
        //         1,
        //         2
        //     ],
        //     freeChampionIds: [
        //         3,
        //         4,
        //         5
        //     ]
        // }
        //
        // const rotation = new Rotation(testData);
        //
        // rotation.save()
        //     .then((data) => {
        //         res.status(201);
        //         res.json(testData);
        //     }).catch((e) => {
        //     // If any error occurred during DB persisting, forward exception to the next middleware.
        //     next(e);
        // });
        //
        // const rotation = new Rotation(testData);
        //
        // rotation.save()
        //     .then((data) => {
        //         res.status(201);
        //         res.json(testData);
        //     }).catch((e) => {
        //     // If any error occurred during DB persisting, forward exception to the next middleware.
        //     next(e);
        // });

        Rotation.findOne({
        }).then((data) => {
            if (null == data) {
                RiotRotationClient.all()
                    .then((response) => {
                        const rotation = new Rotation(response.data);

                        // Try to save the data in our DB.
                        rotation.save()
                            .then((data) => {
                                // If successfully saved, send 201 Created HTTP status code.
                                // @see https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#201
                                res.status(201);
                                // Send data from our DB in the Response.
                                res.json(data);
                            }).catch((e) => {
                            // If any error occurred during DB persisting, forward exception to the next middleware.
                            next(e);
                        });

                    }).catch((e) => {
                    // If rotation not found, send 404 Not Found HTTP status code.
                    // @see https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#404
                    res.status(404);
                    // Send an error object with info.
                    res.json({
                        error: `Cannot find rotation info from Riot's API.`,
                    });
                });
            }
        })
    })
;

module.exports = router;
