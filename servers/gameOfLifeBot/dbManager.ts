import fs from 'fs';
import path from 'path';

type TTodoStatus = 'New' | 'Completed';

interface ITodoItem {
  id: string;
  title: string;
  description: string;
  status: TTodoStatus;
}

interface DB {
  todos: ITodoItem[];
}

export class DBManager {
  private filePath: string;

  constructor(fileName: string) {
    // Создаем путь к файлу относительно текущей директории
    this.filePath = path.resolve(process.cwd(), fileName);

    // Если файла нет, создаем пустой JSON
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, JSON.stringify({}, null, 2), 'utf-8');
    }
  }

  // Получаем все данные или конкретное поле
  getData(): DB;
  getData<K extends keyof DB>(key: K): DB[K];
  getData<K extends keyof DB>(key?: K): DB[K] | DB {
    const raw = fs.readFileSync(this.filePath, 'utf-8');
    const data: DB = JSON.parse(raw);

    if (key) {
      return data[key];
    }

    return data;
  }

  // Устанавливаем все данные или конкретное поле
  setData<K extends keyof DB>(key: K, value: DB[K]): void;
  setData(data: DB): void;
  setData<K extends keyof DB>(keyOrData: K | DB, value?: DB[K]): void {
    const raw = fs.readFileSync(this.filePath, 'utf-8');
    const data: DB = JSON.parse(raw);

    if (typeof keyOrData === 'object') {
      // Если передан объект, перезаписываем весь файл
      fs.writeFileSync(
        this.filePath,
        JSON.stringify(keyOrData, null, 2),
        'utf-8'
      );
    } else {
      // Иначе обновляем конкретное поле
      data[keyOrData] = value!;
      fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
    }
  }
}
export const dbManager = new DBManager('./db.json');
