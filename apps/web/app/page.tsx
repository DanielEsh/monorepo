'use client'
import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";
import Collapse from "../collapse";
import {useState} from "react";
import Checkbox from "../checkbox/checkbox";
import Textfield from "../textfield/textfield";
import Intfield from "../intfield/intfield";
import {ProjectForm} from "../form/ProjectForm";
import {DimensionsForm} from "../form/DimensionsForm";

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

        <div style={{ width: '100%', maxWidth: '600px', margin: '2rem auto' }}>
            <h1>Формы с валидацией</h1>

            <Collapse title="Форма 1: Данные проекта">
                <div style={{ padding: '1rem' }}>
                    <ProjectForm />
                </div>
            </Collapse>

            <Collapse title="Форма 2: Габариты изделия">
                <div style={{ padding: '1rem' }}>
                    <DimensionsForm />
                </div>
            </Collapse>
        </div>
    </div>
  );
}
