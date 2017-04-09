package by.bsuir.lingvic.domain.request;

import java.io.Serializable;

/**
 * Created by Вика on 09.04.2017.
 */
public class StudentSet implements Serializable {
    private Long studentId;
    private Long setId;
    private int isChallenged;

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public Long getSetId() {
        return setId;
    }

    public void setSetId(Long setId) {
        this.setId = setId;
    }

    public int getIsChallenged() {
        return isChallenged;
    }

    public void setIsChallenged(int isChallenged) {
        this.isChallenged = isChallenged;
    }
}
