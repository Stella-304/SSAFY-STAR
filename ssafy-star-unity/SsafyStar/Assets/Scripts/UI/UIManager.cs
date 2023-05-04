using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UIElements;

public class UIManager : MonoBehaviour
{
    [SerializeField]
    private UIDocument doc;

    public void SetVisibleFalse()
    {
        doc.rootVisualElement.style.visibility = Visibility.Hidden;
    }

    public void SetVisibleTrue()
    {
        doc.rootVisualElement.style.visibility = Visibility.Visible;
    }
}
