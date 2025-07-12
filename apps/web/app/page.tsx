'use client'
import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";
import Collapse from "../collapse";
import {useState} from "react";
import Checkbox from "../checkbox/checkbox";
import Textfield from "../textfield/textfield";
import Intfield from "../intfield/intfield";

type Props = Omit<ImageProps, "src"> & {
  srcLight: string;
  srcDark: string;
};

export default function Home() {
    const [agreed, setAgreed] = useState(false);
    const [isIndeterminate, setIndeterminate] = useState(true);

    const [name, setName] = useState('John Doe');
    const [age, setAge] = useState('30');

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>, value: string) => {
        setName(value);
    };

    const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>, value: string) => {
        setAge(value);
    };

  return (
    <div className={styles.page}>


        <div>
            Test

            <Button>
                test
            </Button>
        </div>

        <div style={{ maxWidth: '400px', margin: '2rem auto', fontFamily: 'sans-serif' }}>
            <h2>Компоненты формы</h2>

            <h4>Checkbox</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <Checkbox checked={agreed} onChange={(e) => setAgreed(e.target.checked)}>
                    Я согласен с условиями
                </Checkbox>
                <Checkbox indeterminate>
                    Промежуточное состояние
                </Checkbox>
                <Checkbox defaultChecked disabled>
                    Выбрано и недоступно
                </Checkbox>
            </div>

            <hr style={{ margin: '2rem 0' }} />

            <h4>Textfield (только текст)</h4>
            <Textfield
                label="Ваше имя"
                placeholder="Введите имя без цифр"
                value={name}
                onChange={handleNameChange}
                error={name.length < 3}
                helperText={name.length < 3 ? 'Имя должно быть длиннее 2 символов' : ''}
            />

            <hr style={{ margin: '1rem 0' }} />

            <h4>Intfield (только числа)</h4>
            <Intfield
                label="Ваш возраст"
                placeholder="Введите только цифры"
                value={age}
                onChange={handleAgeChange}
                error={Number(age) < 18}
                helperText={Number(age) < 18 ? 'Вам должно быть 18 или больше' : ''}
            />
        </div>

        <div>
            <Collapse title="test" >
                Collapsed content
            </Collapse>
        </div>
    </div>
  );
}
