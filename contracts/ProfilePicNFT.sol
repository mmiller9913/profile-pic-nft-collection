// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.1;

//NFT contract to inherit from.
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

//Helper functions OpenZeppelin provides.
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

//This lets us console.log in our contract
import "hardhat/console.sol";

// Helper we wrote to encode in Base64
// helper functions to let us encode any data into a Base64 string
import "./libraries/Base64.sol";

contract ProfilePicNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    //Character atributes
    struct PFPAttributes {
        uint256 pfpIndex;
        string name;
        string imageURI;
    }

    //Mapping from the nft's tokenId => that NFTs attributes.
    mapping(uint256 => PFPAttributes) public nftAttributes;

    PFPAttributes[] defaultPFPs;

    constructor(string[] memory pfpNames, string[] memory pfpImageURIs)
        ERC721("The PFP NFT Collection", "PFP")
    {
        //Loop through all the PFPs and save their values in our contract so we can use them later when we mint our NFTs
        for (uint256 i = 0; i < pfpNames.length; i += 1) {
            defaultPFPs.push(
                PFPAttributes({
                    pfpIndex: i,
                    name: pfpNames[i],
                    imageURI: pfpImageURIs[i]
                })
            );
            console.log(
                "Done initializing %s w/ img %s",
                defaultPFPs[i].name,
                defaultPFPs[i].imageURI
            );
        }
    }

    function tokenURI(uint256 _tokenId)
        public
        view
        override
        returns (string memory)
    {
        PFPAttributes memory pfpAttributes = nftAttributes[
            _tokenId
        ];

        // abi.encodePacked just combines strings.
        // encoding the packed string into a base 64 string
        //the name below is the NFT name that shows up in OpenaSea
        //the description also shows up in OpenSea... same with the image, obv
        //Everything aftwer the image shows up under the "levels" tab
        //IMPORTANT - if go back to using IMGUR, not IPFS, remove IPFS stuff below
        string memory json = Base64.encode(
            abi.encodePacked(
                '{"name": "',
                pfpAttributes.name,
                '", "description": "This is an NFT PFP for Matt", "image": "',
                pfpAttributes.imageURI,
                '"}'
            )
        );

        string memory output = string(
            abi.encodePacked("data:application/json;base64,", json)
        );

        return output;
    }

    function mintPFPNFT(uint256 _pfpIndex) external onlyOwner {
        //Get tokenId
        uint256 newItemId = _tokenIds.current();

        //Assigns the tokenId to the caller's wallet address
        _safeMint(msg.sender, newItemId);

        //Map the tokenId => their character attributes
        nftAttributes[newItemId] = PFPAttributes({
            pfpIndex: _pfpIndex,
            name: defaultPFPs[_pfpIndex].name,
            imageURI: defaultPFPs[_pfpIndex].imageURI
        });

        console.log(
            "Minted NFT w/ tokenId %s and characterIndex %s",
            newItemId,
            _pfpIndex
        );
        //Increment the tokenId
        _tokenIds.increment();
    }
}
