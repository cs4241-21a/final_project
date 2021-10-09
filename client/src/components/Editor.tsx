import React, { useCallback, useEffect } from 'react';
import { wysiwygPreset } from 'remirror/extensions';
import { EditorComponent, Remirror, useHelpers, useKeymap, useRemirror, ThemeProvider, useEditorState } from '@remirror/react';
import { TopToolbar, BubbleMenu } from './Menu'

import { AllStyledComponent } from '@remirror/styles/emotion';
import { ProsemirrorNode } from 'prosemirror-suggest';

import { debounce } from '../util/debounce';

const DEBOUNCE_SAVE_DELAY_MS = 250;

// Hooks can be added to the context without the need for creating custom components
const hooks = [
    () => {
        const { getJSON } = useHelpers();

        const handleSaveShortcut = useCallback(
            (props) => {
                const { state } = props;
                console.log(getJSON(state));

                return true; // Prevents any further key handlers from being run.
            },
            [getJSON],
        );

        // "Mod" means platform agnostic modifier key - i.e. Ctrl on Windows, or Cmd on MacOS
        useKeymap('Mod-s', handleSaveShortcut);
    },
    () => {
        const { doc } = useEditorState()

        const debouncedSave = useCallback(
            debounce(async (newDoc: ProsemirrorNode<any>) => {
                console.log(newDoc.toJSON())
            }, DEBOUNCE_SAVE_DELAY_MS), []);

        useEffect(() => {
            debouncedSave(doc)
        }, [doc])
    }
];

function Editor() {
    var extensions = useCallback(() => [...wysiwygPreset()], []);

    const { manager, state } = useRemirror({
        extensions,
    });

    return (
        <AllStyledComponent>
            <ThemeProvider>
                <Remirror manager={manager} initialContent={state} hooks={hooks}>
                    <TopToolbar />
                    <EditorComponent />
                    <BubbleMenu />
                </Remirror>
            </ThemeProvider>
        </AllStyledComponent>
    );
}

export default Editor