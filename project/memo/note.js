// modules
const fs = require('fs');

let fetchNotes = () => {
  // readFileSync =　fileを読み込むメソッドでfileが存在していることが大前提です.
  try {
    let notesString = fs.readFileSync('notes-data.json')
    return JSON.parse(notesString)
  } catch(e) {
    return [];
  }
};

let SaveNotes = (notes) => {
  // fileがなければ自動的に作成する、第一引数はファイル名、第二引数はそのデータ
  fs.writeFileSync('notes-data.json', JSON.stringify(notes))
};

// memoを新規で作成する及び追加を行う
let addNote = (title, body) => {
  // returnの戻り値を受け取る
  let notes = fetchNotes();
  let note = {
    title,
    body
  };
  
  // 重複しているタイトルはフィルターをかける
  let duplicatedNotes = notes.filter(note => note.title === title);

  if (duplicatedNotes.length === 0) {
    notes.push(note);
    SaveNotes(notes)
    return note
  } 
  
};

// memoの一覧表示し、結果を出力
let showAll = () => {
  // console.log('一覧を表示します。')
  return fetchNotes()
};

// 個別のmemoを表示し、結果を表示
let readNote = title => {
  // console.log('メモを個別表示します。', title)
  let notes = fetchNotes();
  let filterdNotes = notes.filter(note => note.title === title);
  return filterdNotes[0]
}

// memoを削除し、結果を表示
let removeNote = title => {
  // console.log('メモを削除します。', title)
  // 既存のデータを取得
  let notes = fetchNotes()
  // 引数をもとに検索し、見つかったら削除
  let fileterdNotes = notes.filter(note => note.title != title)
  // 削除後のデータを保存
  SaveNotes(fileterdNotes);
  // 結果を戻り値とする
  return notes.length !== fileterdNotes.length;
}

let logNotes = note => {
  console.log('-------------')
  console.log(`タイトル: ${note.title}`)
  console.log(`内容: ${note.body}`)
}

// export
module.exports = {
  addNote,
  showAll,
  readNote,
  removeNote,
  logNotes
}

