using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UIElements;

public class OptionController : MonoBehaviour
{
    [SerializeField]
    private VisualTreeAsset option;
    [SerializeField]
    private VisualTreeAsset squareUI;

    private UIDocument doc;
    private bool isOptionOpen = false;
    private Button btnExit;

    [SerializeField]
    private GameData gameData;

    private void Awake()
    {
        doc = GetComponent<UIDocument>();
    }

    void Update()
    {
        if (Input.GetKeyDown(KeyCode.Escape))
        {
            ToggleOption();
        }
    }

    private void ToggleOption()
    {
        if(!isOptionOpen)
        {
            doc.visualTreeAsset = option;
            
            if(btnExit == null)
            {
                btnExit = doc.rootVisualElement.Q<Button>("ButtonExit");
                btnExit.clicked += BtnExitClicked;
            }
        }
        else
        {
            doc.visualTreeAsset = squareUI;
        }

        isOptionOpen = !isOptionOpen;
    }

    private void BtnExitClicked()
    {
        gameData.GameExit();
    }

}
