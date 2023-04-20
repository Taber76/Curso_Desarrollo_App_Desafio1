import { useState } from 'react'
import { Text, View, Button, TextInput, FlatList, TouchableOpacity, Modal } from 'react-native'
import { styles } from './styles'

export default function App() {

  const [eventText, setEventText] = useState('')
  const [eventList, setEventList] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedElement, setSelectedElement] = useState(null)


  const onAddEvent = () => {
    if (eventText.length === 0) return
    setEventList([
      ...eventList,
      {
        id: Math.random().toString(),
        value: eventText
      }
    ])
    setEventText('')
  }

  const onHandleEvent = (id) => {
    setModalVisible(!modalVisible)
    const selectedEvent = eventList.find(event => event.id === id)
    setSelectedElement(selectedEvent)
  }

  const onHandleCancelModal = () => {
    setModalVisible(!modalVisible)
    setSelectedElement(null)
  }

  const onHandleDeleteModal = (id) => {
    setEventList(eventList.filter(event => event.id != id))
    setModalVisible(!modalVisible)
    setSelectedElement(null)
  }

  const renderItem =({ item }) => (
    <TouchableOpacity key={item.id} style={styles.itemContainer} onPress={() => onHandleEvent(item.id)}>
      <Text style={styles.item}>{item.value}</Text>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      
      <View style={styles.inputContainer}>
        <TextInput placeholder='Enter your event'
         style={styles.input}
         value={eventText}
         onChangeText={(eventText) => setEventText(eventText)}
         />
        <Button title='Add' color='#52528C' onPress={onAddEvent} />
      </View>
      
      <View style={styles.listContainer}>
        <FlatList
          renderItem={renderItem}
          data={eventList}
          keyExtractor={(item) => item.id}
          alwaysBounceVertical={false}
        />
      </View>

      <Modal visible={modalVisible} animationType='slide'>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Task Detail</Text>
          <View style={styles.modalDetailContainer}>
            <Text style={styles.modalDetailMessage}>Are you sure to delete this item?</Text>
            <Text style={styles.modalDetailEvent}>{selectedElement?.value}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title='Cancel'
              color='#52528C'
              onPress={() => onHandleCancelModal()}
            />
            <Button
              title='Delete'
              color='#52528C'
              onPress={() => onHandleDeleteModal(selectedElement.id)}
            />
          </View>
        </View>
      </Modal>

    </View>
  )
}