import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { FilterModalProps } from '../types';

export default function FilterModal({ visible, onClose, onApply }: FilterModalProps) {
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [minBid, setMinBid] = useState('');
    const [maxBid, setMaxBid] = useState('');

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <View style={styles.overlay}>
                    <View style={styles.modalBox}>
                        <Text style={styles.heading}>Filter Cars</Text>

                        <Text style={styles.label}>Make</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g. BMW"
                            value={make}
                            onChangeText={setMake}
                        />

                        <Text style={styles.label}>Model</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g. M4"
                            value={model}
                            onChangeText={setModel}
                        />

                        <Text style={styles.label}>Starting Bid (Min → Max)</Text>
                        <View style={styles.row}>
                            <TextInput
                                style={[styles.input, styles.smallInput]}
                                placeholder="Min"
                                keyboardType="numeric"
                                value={minBid}
                                onChangeText={setMinBid}
                            />
                            <TextInput
                                style={[styles.input, styles.smallInput]}
                                placeholder="Max"
                                keyboardType="numeric"
                                value={maxBid}
                                onChangeText={setMaxBid}
                            />
                        </View>

                        <View style={styles.actions}>
                            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
                                <Text style={styles.btnText}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.applyBtn}
                                onPress={() => {
                                    onApply({
                                        make,
                                        model,
                                        minBid: minBid ? Number(minBid) : null,
                                        maxBid: maxBid ? Number(maxBid) : null,
                                    });
                                    onClose();
                                }}
                            >
                                <Text style={styles.btnText}>Apply</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    modalBox: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 18,
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    label: {
        fontWeight: '500',
        marginTop: 12,
    },
    input: {
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 6,
        padding: 8,
        marginTop: 4,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    smallInput: {
        width: '48%',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    cancelBtn: {
        backgroundColor: '#666',
        padding: 10,
        borderRadius: 6,
        width: '48%',
        alignItems: 'center',
    },
    applyBtn: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 6,
        width: '48%',
        alignItems: 'center',
    },
    btnText: {
        color: '#fff',
        fontWeight: '600',
    },
});
