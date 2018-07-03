package no.hlf.godlyd.api.model;

import no.hlf.godlyd.api.Gruppe;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Entity
@Table(name = "tags")
public class Tag implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank
    @NotNull
    @Column(unique = true)
    private String navn;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Gruppe gruppe;

    /*
    @ManyToMany
    @JoinColumn(name = "fk.sted")
    @ElementCollection
    private Set<Sted> steder;
    */

    public Tag(String navn, Gruppe gruppe){
        this.navn = navn;
        this.gruppe = gruppe;
    }

    @Override
    public String toString() {
        return getNavn();
    }

    // Getters and setters
    public String getNavn() { return navn; }

    public void setNavn(String navn) { this.navn = navn; }

    public Integer getId() { return id; }

    public void setId(Integer id) { this.id = id; }

    public Gruppe getGruppe() { return gruppe; }

    public void setGruppe(Gruppe gruppe) { this.gruppe = gruppe; }
}
