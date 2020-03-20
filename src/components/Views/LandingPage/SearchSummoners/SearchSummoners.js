import React, {useState} from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { FormControl,InputGroup,Button} from 'react-bootstrap'
import { FaSearch } from "react-icons/fa";
import { summonersName } from "../../../../actions/summoners_action";

const SearchSummoners = () => {
  const dispatch = useDispatch()
  const summoner = useSelector(state => state.summoners.summoner)
  const onChangeHandler = (e) =>{
    dispatch(summonersName(e.target.value))
  }
  return (
    <div>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="소환사 명을 입력해주세요."
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          onChange={onChangeHandler}
          value={summoner}
        />
        <InputGroup.Append>
          <Button variant="outline-secondary">
            <FaSearch />
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </div>
  );
};

export default SearchSummoners;
