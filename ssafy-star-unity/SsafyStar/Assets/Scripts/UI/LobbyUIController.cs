using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Analytics;
using UnityEngine.UIElements;

public class LobbyUIController : MonoBehaviour
{
    [SerializeField]
    private UIDocument doc;
    private VisualElement dictionary;
    private VisualElement emotion;
    private VisualElement blockGame;
    private VisualElement fishing;
    private VisualElement game;

    [SerializeField]
    private GameObject panelChangeCharacter;
    [SerializeField]
    private GameObject panelEmotion;

    [SerializeField]
    private GameObject alert;
    private CameraMovement cameraMovement;

    private void Start()
    {
        dictionary = doc.rootVisualElement.Q<VisualElement>("Dictionary");
        dictionary.AddManipulator(new Clickable(OpenDictionary));

        emotion = doc.rootVisualElement.Q<VisualElement>("Emotion");
        emotion.AddManipulator(new Clickable(OpenEmotion));

        blockGame = doc.rootVisualElement.Q<VisualElement>("BlockGameSlot");
        blockGame.AddManipulator(new Clickable(OpenBlockGame));

        fishing = doc.rootVisualElement.Q<VisualElement>("FisingGameSlot");
        fishing.AddManipulator(new Clickable(OpenFisingGame));

        game = doc.rootVisualElement.Q<VisualElement>("OtherGameSlot");
        game.AddManipulator(new Clickable(OpenOtherGame));

        cameraMovement = Camera.main.GetComponent<CameraMovement>();
    }

    public void OpenDictionary()
    {
        panelChangeCharacter.SetActive(true);
    }

    public void  CloseDictionary()
    {
        panelChangeCharacter.SetActive(false);
    }

    public void OpenEmotion()
    {
        cameraMovement.stop = true;
        panelEmotion.SetActive(true);
    }
    public void CloseEmotion()
    {
        cameraMovement.stop = false;
        panelEmotion.SetActive(false);
    }

    public void OpenBlockGame()
    {
        cameraMovement.stop = true;
        Debug.Log("OpenBlockGame");
        OpenAlert();
    }

    public void OpenFisingGame()
    {
        cameraMovement.stop = true;
        Debug.Log("OpenDictionary");
        OpenAlert();
    }

    public void OpenOtherGame()
    {
        cameraMovement.stop = true;
        Debug.Log("OpenDictionary");
        OpenAlert();
    }

    public void OpenAlert()
    {
        cameraMovement.stop = true;
        alert.SetActive(true);
    }

    public void CloseAlert()
    {
        cameraMovement.stop = false;
        alert.SetActive(false);
    }
}
