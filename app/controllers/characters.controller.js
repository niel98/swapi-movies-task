const swapi = require('swapi-node');
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const { sortFnc, reduceFnc } = require('../utils/helpers')

const getCharacters = asyncHandler(async (req, res) => {
    const { movie_id } = req.params

    const sortQuery = req.query.sort
    const sortOptions = ['name', 'gender', 'height']
    const sortExist = sortOptions.includes(sortQuery)
        if(sortQuery && !sortExist){
            return res
            .status(400)
            .json({message: 'sort can only be one of name, gender, height'})
        }

    const filter = req.query.filter
    if(filter && !['male','female'].includes(filter)){
        return res
          .status(400)
          .json({message: 'filter can only be ["gender"]'})
      }

    const caracters = await swapi.films({ id: movie_id})
    let characterList = await caracters.getCharacters()

    if (sortQuery) {
        characterList = characterList.sort(sortFnc(sortQuery))
    }

    if(filter) {
        characterList = characterList.filter(character => character.gender === filter)
        console.log(characterList)
    }

    const reg = /^\d+$/
    const heights = characterList.filter(item => item.height).map(item => item.height).filter(num => reg.test(num))
    const sumHeight = reduceFnc(heights)
    const heightInInch = sumHeight/2.54
    const heightInFit = Math.floor(heightInInch/12)
    const remInches = (heightInInch - heightInFit) * 12
    
    res.status(200).send({
        characters: characterList,
        metadata: {
            count: characterList.length,
            totalHeight: characterList.length > 0 ? {
                cm: sumHeight,
                ft: `${heightInFit}ft and ${Math.round(remInches)} inches`
            } : {},
        }
    })
})

module.exports = { getCharacters }