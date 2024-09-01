import React, { ChangeEvent, useEffect, useState } from 'react'
import { FolderDTO } from './FolderDTO'
import { FormControl, FormLabel, ListGroup, ListGroupItem } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import cosineSimilarity from 'compute-cosine-similarity'

type Props = {folder?: FolderDTO}

export const SearchBar = (props: Props) => {
  const [query,setQuery] = useState<string>('');
  const [results, setResults] = useState<string[]>([]);

  useEffect(() => {
    search();
  },[query])
  
  const getFolderId = (folderName:string) => {
    const index = props.folder?.subFolderNames.indexOf(folderName);
    return props.folder?.subFolderIds[index || 0];
  }
  
  const search = () => {
    const matchingResults = props.folder?.subFolderNames
    .map(folderName => ({
      name: folderName,
      similarity: calculateSimilarity(replaceTonus(folderName), replaceTonus(query))
    }))
    .filter(result => result.similarity > 0.5)
    .sort((a, b) => b.similarity - a.similarity)
    .map(result => result.name);    
    setResults(matchingResults || []);
  }

  const reset = () => {
    setQuery('');
    setResults([]);
  }

  function padMatrix(matrix:number[],numOfPads:number){
    for (let i = 0; i < numOfPads; i++) {
      matrix.push(1);
    }
  }

  function replaceTonus(str: string): string {
    const tonusMap: { [key: string]: string } = {
      'ά': 'α',
      'έ': 'ε',
      'ή': 'η',
      'ί': 'ι',
      'ό': 'ο',
      'ύ': 'υ',
      'ώ': 'ω',
      'Ά': 'Α',
      'Έ': 'Ε',
      'Ή': 'Η',
      'Ί': 'Ι',
      'Ό': 'Ο',
      'Ύ': 'Υ',
      'Ώ': 'Ω',
      'ς': 'σ'
    };
  
    return str.split('').map(char => tonusMap[char] || char).join('');
  }

  function isGreekCharacter(character:string):boolean{
    const charCode = character.charCodeAt(0);
    return charCode>944 && charCode < 944+24;
  }

  function calculateSimilarity(sentence:string,anotherSentence:string) {
    const matrix = new Array(24).fill(0);
    const anotherMatrix = new Array(24).fill(0);
    console.log(matrix.length,anotherMatrix.length)

    for(let letter of sentence)
      if(isGreekCharacter(letter))
        matrix[letter.charCodeAt(0) - 945]++;
    
    for(let letter of anotherSentence)
      if(isGreekCharacter(letter))
        anotherMatrix[letter.charCodeAt(0) - 945]++;
    
    console.log(cosineSimilarity(matrix,anotherMatrix));
    return cosineSimilarity(matrix,anotherMatrix) || 0;
  }
  
  return (
    <div>
        <FormControl placeholder='Search...' size='lg' value={query} as={'input'} onChange={(e) => setQuery(e.target.value)}></FormControl>
        <ListGroup>
          {
            results.map((result) => (
              <Link to={`/folder/${getFolderId(result)}`} onClick={()=>reset()} style={{color:'black',textDecoration:'none' }}>
                <ListGroupItem>
                  {result}
                </ListGroupItem>
              </Link>
            ))
          }
        </ListGroup>
    </div>    
  )
}