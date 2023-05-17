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
    private VisualElement fishing;
    private VisualElement game;

    [SerializeField]
    private GameObject panelChangeCharacter;
    [SerializeField]
    private GameObject panelEmotion;

    [SerializeField]
    private GameObject alert;

    private void Start()
    {
        dictionary = doc.rootVisualElement.Q<VisualElement>("Dictionary");
        dictionary.AddManipulator(new Clickable(OpenDictionary));

        emotion = doc.rootVisualElement.Q<VisualElement>("Emotion");
        emotion.AddManipulator(new Clickable(OpenEmotion));

        fishing = doc.rootVisualElement.Q<VisualElement>("FisingGameSlot");
        fishing.AddManipulator(new Clickable(OpenFisingGame));

        game = doc.rootVisualElement.Q<VisualElement>("OtherGameSlot");
        game.AddManipulator(new Clickable(OpenOtherGame));
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
        panelEmotion.SetActive(true);
    }
    public void CloseEmotion()
    {
        panelEmotion.SetActive(false);
    }

    public void OpenFisingGame()
    {
        Debug.Log("OpenDictionary");
        OpenAlert();
    }

    public void OpenOtherGame()
    {
        Debug.Log("OpenDictionary");
        OpenAlert();
    }

    public void OpenAlert()
    {
        alert.SetActive(true);
    }

    public void CloseAlert()
    {
        alert.SetActive(false);
    }
}
