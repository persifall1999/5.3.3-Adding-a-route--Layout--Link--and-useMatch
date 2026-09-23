import { ActionIcon, Group, Paper, Pill, Stack, Text, TextInput, useMantineTheme } from "@mantine/core";
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../store/store";
import { addSkill, removeSkill } from "../../store/jobsSlice";
import styles from './Skills.module.scss'
import { PlusIcon } from "../SvgIcons"; 

export const Skills = () => {
    const theme = useMantineTheme();
    const dispatch = useAppDispatch();
    
    const skills = useAppSelector((state) => state.jobs.skills)
    const [inputValue, setInputValue] = useState('');

    const handleAddSkill = () => {
        const trimmedValue = inputValue.trim();
        if (trimmedValue) {
            dispatch(addSkill(trimmedValue));
            setInputValue('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddSkill();
        }
    };

    const handleRemoveSkill = (skillToRemove: string) => {
        dispatch(removeSkill(skillToRemove));
    };

    return (
        <Paper p={24} radius={12} className={styles.paperSkills} >
            <Stack gap="sm">
                <Text fw={600} size="14px" style={{
                    color: theme.colors.black1[0]
                }}>
                    Ключевые навыки
                </Text>
                
                <Group gap={8} wrap="nowrap" className={styles.inputGroup}>
                    <TextInput 
                        placeholder="Навык"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        size="xs"
                        className={styles.textInput}
                        styles={{
                            input: {
                                className: styles.customInput,
                                color: theme.colors.black1[0], 
                                '&:focus': {
                                    borderColor: theme.colors.indigo[6],
                                }
                            }
                        }}
                    />

                    <ActionIcon 
                        radius="md" 
                        onClick={handleAddSkill}
                        className={styles.actionIcon}
                    >
                        <PlusIcon size={15} className={styles.actionSvg} />
                    </ActionIcon>
                </Group>

                <Group gap={6} wrap="wrap" className={styles.groupPills} >
                    {skills.map((skill) => (
                        <Pill 
                            key={skill}
                            withRemoveButton
                            onRemove={() => {handleRemoveSkill(skill)}}
                            styles={{
                                root: {
                                    padding: '2px 4px 2px 12px',
                                    height: 'auto',
                                },
                                label: {
                                    color: theme.colors.black1[0],
                                    marginRight: '3px',
                                    fontSize: '12px',
                                    fontWeight: '400',
                                },
                                remove: {
                                    padding: '3px',
                                    color: '#0F0F104D',
                                }
                            }}
                        >
                            {skill}
                        </Pill>
                    ))}
                </Group>
            </Stack>
        </Paper>
    );
};