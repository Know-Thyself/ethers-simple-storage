//SPDX-License-Identifier: MIT
//EVM - Ethereum Virtual Machine --> where our code is compiled
//We can write our solidity code and deploy to EVM compatible blockchains
//EVM compatible blockchains --> Avalanche, Fantom, Polygon
pragma solidity ^0.8.7;

contract SimpleStorage {
	// bool hasFavoriteNumber = true;
	uint256 favoriteNumber;
	mapping(string => uint256) public nameToFavoriteNumber;
	// int favoriteInt = -123;
	// string favoriteNumberInText = 'Five';
	// address = 0x0b7AA53d1EE8d29a868fEBf18CAf341D45A3a5DB;
	// bytes32 favoriteBytes = 'cat';
	// People public person = People({favoriteNumber: 4, name: 'Biruk'});
	// People public person2 = People({favoriteNumber: 2, name: 'Glen'});
	//Dynamic array --> can be any size
	People[] public people;

	//Fixed array --> the size is fixed
	// People[3] public people;
	//calldata, memory, storage
	function addPerson(string memory _name, uint256 _favoriteNumber) public {
		people.push(People(_favoriteNumber, _name));
		//alternatively
		// People memory newPerson = People({favoriteNumber: _favoriteNumber, name: _name}); <-- more explicit
		// OR
		// People memory newPerson = People(_favoriteNumber, _name);
		// AND
		// people.push(newPerson);
		nameToFavoriteNumber[_name] = _favoriteNumber;
	}

	struct People {
		uint256 favoriteNumber;
		string name;
	}

	function store(uint256 _favoriteNumber) public virtual {
		favoriteNumber = _favoriteNumber;
		// favoriteNumber = favoriteNumber + 1;
	}

	// view and pure are functions that don't have to spend gas to run unless they are called by a function that costs gas e.g store
	function retrieve() public view returns (uint256) {
		return favoriteNumber;
	}

	function add() public pure returns (uint256) {
		return (1 + 1);
	}
}
