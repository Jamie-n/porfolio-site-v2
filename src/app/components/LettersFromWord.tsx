import Letter from "./Letter";

export default function LettersFromWord({ word }: { word: string }) {
  const characters = word.split('');

  return (
    <div className="flex">
      {characters.map((c, index) =>
        (<Letter key={c + index}> {c} </Letter>)
      )
      }
    </div>
  )
}
