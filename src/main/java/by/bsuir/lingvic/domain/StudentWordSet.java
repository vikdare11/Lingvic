package by.bsuir.lingvic.domain;

import javax.persistence.*;

@Entity(name = "student_word_set")
public class StudentWordSet {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id")
    private Student student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "set_id")
    private Set set;

    @Column(name = "is_challenged")
    private boolean isChanllenged;


    public Student getStudent() {
        return student;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public Set getSet() {
        return set;
    }

    public void setSet(Set set) {
        this.set = set;
    }

    public boolean isChanllenged() {
        return isChanllenged;
    }

    public void setChanllenged(boolean chanllenged) {
        isChanllenged = chanllenged;
    }
}
